import React from "react";
import "../styles/pages/login.css";
import {useNavigate} from "react-router-dom";

export default function Register(this: any): JSX.Element {
    const navigate = useNavigate();
    async function onSubmit(event: any): Promise<any> {
        event.preventDefault();
        const newUser = {
            u_name: event.target.username.value,
            password: event.target.password.value,
        };
        console.log("newUser", newUser);
        // "后端注册API"
        const response = fetch("http://localhost:8000/user", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser),
            }).then(res => res.text()).then(res => {
                alert("Your user id is " + res + ". Please remember!");
                navigate("/login");
            })
        ;

        return;
    }

    return (
        <div className="login" onSubmit={onSubmit}>
            <form id="registerForm">
                <fieldset>
                    <legend>注册</legend>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password"/>
                    <input type="submit" value="Sign up"/>
                </fieldset>
            </form>
        </div>
    );
}
