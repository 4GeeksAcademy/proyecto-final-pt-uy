import React, { createContext, useContext, useEffect, useState } from 'react';

import {} from "../../client-API/backendAPI";

// Crear el contexto para el store
export const UserContext = createContext(null);

// Estado inicial del store
const storeInitialState = {
  user: {},
  token: "",
  animals: [],
};

// =============== PROVEEDOR DEL CONTEXTO ================ //
export function UserContextProvider({ children }) {
    // ================== STORE ================== //
    // Contiene los datos del Contexto.
    const [store, setStore] = useState(storeInitialState);
  
   
    // =============== ACTIONS ================= //
    // Contiene las funciones que modifican el store.
    const actions = {
        setAnimals: (animals) => setStore(prevState => ({ ...prevState, animals: animals })),
        setToken: (token) => setStore(prevState => ({ ...prevState, token: token })),
        setUser: (user) => setStore(prevState => ({ ...prevState, user: user })),
        synkWithLocalStorage: () => {
          const storedUser = localStorage.getItem("user");
          const storedToken = localStorage.getItem("token");

          if (storedUser && storedToken) {
            setStore(prevState => ({ ...prevState, user: JSON.parse(storedUser), token: storedToken }));
          }
        }
    }
  
  
    // Sincronizar el estado global con los datos del localstorage si este tiene datos
    useEffect(() => {
      if (localStorage.getItem("user") && localStorage.getItem("token")) {
        actions.synkWithLocalStorage();
      }
    }, []); 
    
  
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
