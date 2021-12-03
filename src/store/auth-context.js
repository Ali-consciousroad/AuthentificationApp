import React, { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    // We currently do nothing with those data but they would be needed in a real app
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Executed by React after component reevaluation 
    /* Thanks to useEffect(), we execute this anonymous function only once 
    otherwise we would have gotten an infinite loop  
    */
    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

        if (storedUserLoggedInInformation === "1") {
        setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
          value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler,
          }}
        >
          {props.children}
        </AuthContext.Provider>);
};

export default AuthContext;