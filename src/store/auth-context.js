import React, { useEffect, useState, useCallback } from "react";
import AuthCommunicator from "../services/AuthCommunicator";

const AuthContext = React.createContext({
  // default context
  loggedIn: false,
  sessionExpired: false,
  // dummy fns for better IDE autocompletion:
  onLogin: (email, password) => { },
  onLogout: () => { },
  onSessionExpired: () => { },
});

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (AuthCommunicator.isLoggedIn()) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    return AuthCommunicator.login(email, password)
      .then(() => {
        setLoggedIn(true);
      }).catch(error => {
        console.log(error);
        throw new Error(error); // should be caught by LoginForm 
      });
  }

  const clearSession = () => {
    AuthCommunicator.clearSession();
    setLoggedIn(false);
  }

  const handleLogout = () => {
    clearSession();
  }

  const handleSessionExpired = useCallback(() => {
    setSessionExpired(true);
    clearSession();
  }, []);

  return (
    <AuthContext.Provider value={
      {
        loggedIn: loggedIn,
        sessionExpired: sessionExpired,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onSessionExpired: handleSessionExpired,
      }
    }>
      {props.children}
    </AuthContext.Provider>
  );

}


export default AuthContext;