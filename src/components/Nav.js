import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../loginContext";
const Nav = () => {
  const [loginState] = useContext(LoginContext);
  const navStyle = {
    color: "white",
  };
  return (
    <nav>
      <h3>Logo</h3>
      <ul className="nav-links">
        {!loginState.authenticated && (
          <>
            <Link to="/login" style={navStyle}>
              <li>Login</li>
            </Link>
            <Link to="/register" style={navStyle}>
              <li>Register</li>
            </Link>
          </>
        )}

        {loginState.authenticated && (
          <>
            <Link to="/posts" style={navStyle}>
              <li>Posts</li>
            </Link>
            <Link to="/logout" style={navStyle}>
              <li>Logout</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
