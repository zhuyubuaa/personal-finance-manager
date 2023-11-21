import React from "react";
import "../styles/pages/login.css";

export default function Register(): JSX.Element {
  async function onSubmit(event: any): Promise<any> {
    event.preventDefault();
    const newUser = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    console.log("newUser", newUser);

    //"后端注册API"
    // const response = fetch("后端注册API", {
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
    <div className="login" onSubmit={onSubmit}>
      <form id="registerForm">
        <fieldset>
          <legend>注册</legend>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="userpass">Password</label>
          <input type="text" id="password" name="password" />

          <input type="submit" value="Sign up" />
        </fieldset>
      </form>
    </div>
  );
}
