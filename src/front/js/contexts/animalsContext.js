import React, { createContext, useContext, useState } from 'react';

// Crear el contexto para el store
export const AnimalsContext = createContext(null);

// Estado inicial del store
const storeInitialState = {
  animals: [],
  animalDetails: {},
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
  }
};

// =============== PROVEEDOR DEL CONTEXTO ================ //
export function AnimalsContextProvider({ children }) {
    // ================== STORE ================== //
    // Contiene los datos del Contexto.
    const [store, setStore] = useState(storeInitialState);
  
   
    // =============== ACTIONS ================= //
    // Contiene las funciones que modifican el store.
    const actions = {
        setAnimals: (animals) => {
          return setStore(prevState => ({ 
            ...prevState, 
            animals: animals 
          }))
        },
        setAnimalDetails: (animalDetails) => {
          return setStore(prevState => ({
            ...prevState, 
            animalDetails: animalDetails
          }))
        },
        // TO-DO: crear actions para gestionar filtrado, ordenamiento y paginado
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
