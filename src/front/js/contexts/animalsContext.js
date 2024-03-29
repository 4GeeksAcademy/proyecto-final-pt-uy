import React, { createContext, useContext, useState, useEffect } from 'react';

import { useUserContext } from '../contexts/userContext';
import { getAnimalList } from '../../client-API/backendAPI';


// Crear el contexto para el store
export const AnimalsContext = createContext(null);

// Estado inicial del store
const storeInitialState = {
  animals: [],
  filters: {
    types: { dog: true, cat: true },
    genders: { male: true, female: true, undefined: true },
    sizes: { small: true, medium: true, large: true, undefined: true },
    statuses: { not_adopted: true, adopted: false, passed_away: false }
  },
  sorting: {
    sortOrder: "desc",
    sortBy: "publication_date", // posibles valores: "id", "name", "birth_date", "publication_date"
  },
  pagination: {
    limit: 12,
    offset: 0,
    totalPages: 1,
    currentPage: 1,
    totalAnimals: 0
  },
  isLoading: false,
  error: ""
};

// =============== PROVEEDOR DEL CONTEXTO ================ //
export function AnimalsContextProvider({ children }) {
  const { store: { token } } = useUserContext();

  // ================== STORE ================== //
  // Contiene los datos del Contexto.
  const [store, setStore] = useState(storeInitialState);

  // =============== ACTIONS ================= //
  // Contiene las funciones que modifican el store.
  const actions = {
    setTypes: (payload) => {
      return setStore(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          types: {
            ...prevState.filters.types,
            ...payload
          }
        }
      }))
    },
    setGenders: (payload) => {
      return setStore(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          genders: {
            ...prevState.filters.genders,
            ...payload
          }
        }
      }))
    },
    setSizes: (payload) => {
      return setStore(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          sizes: {
            ...prevState.filters.sizes,
            ...payload
          }
        }
      }))
    },
    setStatuses: (payload) => {
      return setStore(prevState => ({
        ...prevState,
        filters: {
          ...prevState.filters,
          statuses: {
            ...prevState.filters.statuses,
            ...payload
          }
        }
      }))
    },
    setSorting: (payload) => {
      return setStore(prevState => ({
        ...prevState,
        sorting: payload
      }))
    },
    setPagination: (payload) => {
      return setStore(prevState => ({
        ...prevState,
        pagination: {
          ...prevState.pagination,
          ...payload
        }
      }))
    },
    setAnimals: async () => {
      const pagination = {page: store.pagination.currentPage, perPage: store.pagination.limit};
      const sorting = {sortBy: store.sorting.sortBy, sortOrder: store.sorting.sortOrder};

      const statusesArray = [];
      for (const status in store.filters.statuses) {
        if (store.filters.statuses[status]) {
          statusesArray.push(status)
        }
      }
      const typesArray = [];
      for (const type in store.filters.types) {
        if (store.filters.types[type]) {
          typesArray.push(type)
        }
      }
      const gendersArray = [];
      for (const gender in store.filters.genders) {
        if (store.filters.genders[gender]) {
          gendersArray.push(gender)
        }
      }
      const sizesArray = [];
      for (const size in store.filters.sizes) {
        if (store.filters.sizes[size]) {
          sizesArray.push(size)
        }
      }
      const filtering = {statusesArray, typesArray, gendersArray, sizesArray}

      setStore(prevState => ({
        ...prevState,
        error: "",
        isLoading: true
      }));

      try {
        const data = await getAnimalList(pagination, sorting, filtering);
        setStore(prevState => ({
          ...prevState,
          animals: data.result,
          pagination: {
            ...prevState.pagination,
            totalAnimals: data.total_animals,
            totalPages: Math.ceil(data.total_animals / prevState.pagination.limit),
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
