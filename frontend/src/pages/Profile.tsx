import React from "react";
import { useUserContext } from "../context/UserContext";
import { Button } from "@mui/material";
import Header from "../components/Header";

export default function Profile(): JSX.Element {
  const { currentUser, handleLogout } = useUserContext();
  return (
    <div>
      <Header />
      <div>
        Profile Page
        <p>
          <b>UserName: </b>
          {currentUser?.userName}
        </p>
        <p>
          <b>User ID: </b>
          {currentUser?.userId}
        </p>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
