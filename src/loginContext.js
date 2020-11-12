import React, {createContext, useState} from 'react';


export const LoginContext = createContext();

export const LoginProvider = (props) => {

    const [loginState, setLoginState] = useState({
        user:{},
        authenticated: false
    })

    return (
        <LoginContext.Provider value={[loginState, setLoginState]}>
            {props.children}
        </LoginContext.Provider>
    )
}
