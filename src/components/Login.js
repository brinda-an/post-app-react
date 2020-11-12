import React, { useRef, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../loginContext";

const Login = () => {
  const history = useHistory();
  const [loginState, setLoginState] = useContext(LoginContext);
  const [error, setError] = useState(null);

  const email = useRef();
  const password = useRef();

  const loginHandler = () => {
    let currData = {
      email: email.current.value,
      password: password.current.value,
    };

    fetch(
      `https://5fa3a8baf10026001618db30.mockapi.io/users?email=${currData.email}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (
          data.length > 0 &&
          data[0].email === currData.email &&
          data[0].password === currData.password
        ) {
          console.log("succcess");
          setError(null);
          let user = {
            name: data[0].name,
            id: data[0].id,
            email: data[0].email,
          };
          let loginData = { user: user, authenticated: true };
          localStorage.setItem("loginData", JSON.stringify(loginData));
          setLoginState(loginData);
        } else {
          setError("email or password wrong...");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong on server...");
      });
  };

  useEffect(()=> {
    if(loginState.authenticated) {
      history.push('/posts');
    }
  }, [history, loginState]);

  return (
    <div>
      <input type="email" placeholder="email" ref={email} />
      <br />
      <input type="password" placeholder="password" ref={password} />
      <br />
      <button onClick={loginHandler}>Login</button>
      <p>{error}</p>
    </div>
  );
};

export default Login;
