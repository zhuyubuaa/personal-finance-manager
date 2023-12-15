import React, {useState} from "react";
import {useUserContext} from "../context/UserContext";
import {Button} from "@mui/material";
import "../styles/pages/profile.css";
import UserEdit from "../components/sub/UserEdit";

export default function Profile(): JSX.Element {
    const [userEditDialog, setUserEditDialog] = useState<boolean>(false);
    const {currentUser, handleLogout} = useUserContext();
    const handleEdit = () => {
        setUserEditDialog(true);
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
                {userEditDialog && (
                    <UserEdit
                        open={userEditDialog}
                        onClose={() => setUserEditDialog(false)}
                    />
                )}
                <Button variant="outlined" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}
