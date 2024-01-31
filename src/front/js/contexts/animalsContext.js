import React, { createContext, useContext, useState, useEffect } from 'react';

import { useUserContext } from '../contexts/userContext';
import { getAnimalList } from '../../client-API/backendAPI';


// Crear el contexto para el store
export const AnimalsContext = createContext(null);

// Estado inicial del store
const storeInitialState = {
  animals: [],
  filters: {
    types: {dog: true, cat: true},
    genders: {male: true, female: true},
    sizes: {small: true, medium: true, large: true}
  },
  sorting: {
    sortOrder: null,
    sortBy: null
  },
  pagination: {
    limit: 12,
    offset: 0,
    totalPages: 0,
    currentPage: 0,
    totalAnimals: 0
  },
  isLoading: false,
  error: ""
};

// =============== PROVEEDOR DEL CONTEXTO ================ //
export function AnimalsContextProvider({ children }) {
    const { store: {token} } = useUserContext();

    // ================== STORE ================== //
    // Contiene los datos del Contexto.
    const [store, setStore] = useState(storeInitialState);
   
    // =============== ACTIONS ================= //
    // Contiene las funciones que modifican el store.
    const actions = {
        setFilters: (filters) => {
          return setStore(prevState => ({ 
            ...prevState, 
            filters: filters 
          }))
        },
        setSorting: (sorting) => {
          return setStore(prevState => ({ 
            ...prevState, 
            sorting: sorting 
          }))
        },
        setPagination: (pagination) => {
          return setStore(prevState => ({ 
            ...prevState, 
            pagination: pagination 
          }))
        },
        setAnimals: async () => {
          setStore(prevState => ({ 
            ...prevState, 
            error: "",
            isLoading: true
          }));
    
          try {
            const data = await getAnimalList();
            setStore(prevState => ({ 
              ...prevState, 
              animals: data.result,
              pagination: {
                ...prevState.pagination,
                totalAnimals: data.total_animals,
              },
              error: "",
              isLoading: false
            }));
            
          } catch (error) {
            console.error("Error fetching animals: ", error);
            setStore(prevState => ({ 
              ...prevState, 
              error: error.message,
              isLoading: false
            }));
          }
        }
    }


  
    return (
      <AnimalsContext.Provider value={{ store, actions }}>
        {children}
      </AnimalsContext.Provider>
    );

  };
  
  
  // Hook personalizado para acceder al contexto
  export function useAnimalsContext() {
    const context = useContext(AnimalsContext);
    if (!context) {
      throw new Error('useAnimalsContext debe ser usado dentro de un AnimalsContextProvider');
    }
    return context;
  };
