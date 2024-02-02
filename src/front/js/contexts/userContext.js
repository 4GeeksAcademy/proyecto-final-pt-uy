import React, { createContext, useContext, useEffect, useState } from 'react';

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
