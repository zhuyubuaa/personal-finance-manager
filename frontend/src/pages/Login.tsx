import React from "react";
import "../styles/pages/login.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Button, Typography } from "@mui/material";

export default function Login(): JSX.Element {
  const { setCurrentUser } = useUserContext();
  const navigate = useNavigate();

  async function onSubmit(event: any): Promise<any> {
    event.preventDefault();
    const loginUser = {
      u_id: event.target.u_id.value,
      password: event.target.password.value,
    };
    // console.log("user", loginUser);

    const response = await fetch("http://localhost:8000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    });
    console.log(response);
    if (response.status === 200) {
      const data = (await response.json()) as any;
      // console.log(data);
      const value = data["value"];
      if (value === 0) {
        const user = {
          userId: loginUser.u_id,
          userName: data["u_name"],
        };
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else if (value === 1) {
        alert("password not match");
      } else if (value === 2) {
        alert("user not found");
      } else {
        alert("unknown error");
      }
    } else {
      alert("Unable to login");
    }

    return;
  }

  return (
    <div className="login">
      <form className="login-form" onSubmit={onSubmit}>
        <Typography variant="h6" sx={{ textAlign: "center", color: "#6b5cd6" }}>
          LOGIN
        </Typography>
        <>
          <label htmlFor="u_id">User ID</label>
          <input type="text" id="u_id" name="u_id" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <input
            type="Submit"
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
          onClick={() => navigate("/register")}
          sx={{ color: "#6b5cd6" }}
        >
          Register new user
        </Button>
      </form>
    </div>
  );
}
