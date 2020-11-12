import React, { useContext, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import { LoginContext } from "./loginContext";
const App = () => {
  const [, setLoginState] = useContext(LoginContext);

  useEffect(() => {
    const xxx = JSON.parse(localStorage.getItem("loginData"));

    if (xxx !== null) {
      setLoginState(xxx);
    }
    //localStorage.setItem('loginData', JSON.stringify(loginData));
  }, [setLoginState]);

  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/posts" component={Posts} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
