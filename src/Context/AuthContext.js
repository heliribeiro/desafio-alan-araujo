import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, loading,erroLogin,setErroLogin, handleLogin, handleLogout,
  } = useAuth();

  return (
    <Context.Provider value={{ loading, authenticated, erroLogin,setErroLogin, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
