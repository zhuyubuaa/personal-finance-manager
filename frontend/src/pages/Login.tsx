import React from "react";
import "../styles/pages/login.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Login(): JSX.Element {
  const { setCurrentUser } = useUserContext();
  const navigate = useNavigate();

  async function onSubmit(event: any): Promise<any> {
    event.preventDefault();
    const loginUser = {
      u_id: event.target.u_id.value,
      password: event.target.password.value,
    };
    console.log("login user", loginUser);

    const response = await fetch("http://localhost:8000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    });

    console.log("login res", response);
    if (response.status === 200) {
      setCurrentUser({
        userId: loginUser.u_id,
        userName: "username",
      });
      navigate("/home");
    } else {
      alert("Unable to login");
    }

    return;
  }

  return (
    <div className="login">
      <form id="loginForm" onSubmit={onSubmit}>
        <fieldset>
          <legend>登录</legend>
          <label htmlFor="u_id">Username</label>
          <input type="text" id="u_id" name="u_id" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
          <input type="Submit" value="Login" />
        </fieldset>
        <a href="/register">Register new user</a>
      </form>
    </div>
  );
}
