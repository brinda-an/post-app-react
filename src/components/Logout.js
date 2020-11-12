import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { LoginContext } from "../loginContext";
const Logout = () => {
  const [, setLoginState] = useContext(LoginContext);

  useEffect(() => {
    setLoginState({ user: {}, authenticated: false });
    localStorage.clear();
  }, [setLoginState]);
  return <Redirect to="/login" />;
};

export default Logout;
