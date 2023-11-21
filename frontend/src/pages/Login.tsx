import React from "react";
import "../styles/pages/login.css";

export default function Login(): JSX.Element {
  async function onSubmit(event: any): Promise<any> {
    event.preventDefault();
    const loginUser = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log("login user", loginUser);

    // const response = fetch("后端登录API", {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username: event.target.username.value,
    //     password: event.target.password.value,
    //   }),
    // });
    return;
  }

  return (
    <div className="login">
      <form id="loginForm" onSubmit={onSubmit}>
        <fieldset>
          <legend>登录</legend>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="userpass">Password</label>
          <input type="text" id="userpass" name="userpass" />
          <input type="Submit" value="Login" />
        </fieldset>
      </form>
    </div>
  );
}
