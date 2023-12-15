import React from "react";
import "../styles/pages/login.css";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export default function Register(this: any): JSX.Element {
  const navigate = useNavigate();
  async function onSubmit(event: any): Promise<any> {
    event.preventDefault();
    const newUser = {
      u_name: event.target.username.value,
      password: event.target.password.value,
    };
    // "后端注册API"
    await fetch("http://localhost:8000/user", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.text())
      .then((res) => {
        alert("Your user id is " + res + ". Please remember!");
        navigate("/login");
      });
    return;
  }

  return (
    <div className="login" onSubmit={onSubmit}>
      <form className="login-form">
        <Typography variant="h6" sx={{ textAlign: "center", color: "#6b5cd6" }}>
          REGISTER
        </Typography>
        <>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" />
          <input
            type="submit"
            style={{
              color: "#fff",
              border: "none",
              backgroundColor: "#6b5cd6",
              height: "30px",
              padding: "3px 9px",
              fontSize: "16px",
            }}
          />
        </>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate("/login")}
          sx={{ color: "#6b5cd6" }}
        >
          Back to Login
        </Button>
      </form>
    </div>
  );
}
