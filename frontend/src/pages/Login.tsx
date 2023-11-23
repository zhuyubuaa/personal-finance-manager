import React from "react";
import "../styles/pages/login.css";

export default function Login(): JSX.Element {
    async function onSubmit(event: any): Promise<any> {
        event.preventDefault();
        const loginUser = {
            u_id: event.target.u_id.value,
            password: event.target.password.value,
        };
        console.log("login user", loginUser);

        const response = fetch("http://localhost:8000/login", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginUser),
        }).then(res => res.text()).then(res => {
            if (res == "0") {
                alert("login successfully!")
            } else {
                alert(res)
            }
        });
        return;
    }

    return (
        <div className="login">
            <form id="loginForm" onSubmit={onSubmit}>
                <fieldset>
                    <legend>登录</legend>
                    <label htmlFor="u_id">Username</label>
                    <input type="text" id="u_id" name="u_id"/>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password"/>
                    <input type="Submit" value="Login"/>
                </fieldset>
            </form>
        </div>
    );
}
