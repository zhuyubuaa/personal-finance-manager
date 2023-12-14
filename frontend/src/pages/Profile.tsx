import React from "react";
import { useUserContext } from "../context/UserContext";
import { Button } from "@mui/material";
import "../styles/pages/profile.css";

export default function Profile(): JSX.Element {
  const { currentUser, handleLogout } = useUserContext();
  const handleEdit = () => {
    console.log("handleEdit");
  };
  return (
    <div className="profile">
      <div>
        <p>
          <b>UserName: </b>
          {currentUser?.userName}
        </p>
        <p>
          <b>User ID: </b>
          {currentUser?.userId}
        </p>
        <Button variant="outlined" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
