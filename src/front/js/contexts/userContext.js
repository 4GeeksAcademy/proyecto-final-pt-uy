import React, { createContext, useContext, useEffect, useState } from 'react';

import { getUsersList } from '../../client-API/backendAPI';

// Crear el contexto para el store
export const UserContext = createContext(null);

// Estado inicial del store
const storeInitialState = {
  user: {
    id: null,
    name: "",
    role: "",
  },
  token: "",
  users: [],
  pagination: {
    limit: 12,
    offset: 0,
    totalPages: 1,
    currentPage: 1,
    totalUsers: 0
  },
  isLoading: false,
  error: ""
};

// =============== PROVEEDOR DEL CONTEXTO ================ //
export function UserContextProvider({ children }) {
  // ================== STORE ================== //
  // Contiene los datos del Contexto.
  const [store, setStore] = useState(storeInitialState);


  // =============== ACTIONS ================= //
  // Contiene las funciones que modifican el store.
  const actions = {
    setToken: (token) => setStore(prevState => ({ ...prevState, token: token })),
    setUser: (userInfo) => {
      return setStore(prevState => ({
        ...prevState,
        user: {
          id: userInfo.id,
          name: userInfo.name,
          role: userInfo.role
        }
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
    setUsers: async () => {
      const pagination = {page: store.pagination.currentPage, perPage: store.pagination.limit};

      setStore(prevState => ({
        ...prevState,
        error: "",
        isLoading: true
      }));

      try {
        const data = await getUsersList(pagination, store.token);
        setStore(prevState => ({
          ...prevState,
          users: data.result,
          pagination: {
            ...prevState.pagination,
            totalUsers: data.total_users,
            totalPages: data.total_pages,
          },
          error: "",
          isLoading: false
        }));

      } catch (error) {
        console.error("Error fetching users: ", error);
        setStore(prevState => ({
          ...prevState,
          error: error.message,
          isLoading: false
        }));
      }
    }
  }


  return (
    <UserContext.Provider value={{ store, actions }}>
      {children}
    </UserContext.Provider>
  );
};


// Hook personalizado para acceder al contexto
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser usado dentro de un UserContextProvider');
  }
  return context;
};
