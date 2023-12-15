import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormLabel,
    Alert,
} from "@mui/material";
import {useState} from "react";
import {useUserContext} from "../../context/UserContext";

export default function UserEdit(props: any): JSX.Element {
    const {open, onClose} = props;
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const curUser = useUserContext().currentUser;

    const onSubmit = async (event: any): Promise<any> => {
        event.preventDefault();
        try {
            const editedUser = {
                u_name: userName,
                password: password,
                u_id: curUser?.userId,
            };
            const response = await fetch("http://localhost:8000/user", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(editedUser),
            });

        } catch (error) {
            console.log("user edit error", error);
        } finally {
            onClose();
        }
        const user = {
            userId: curUser?.userId,
            userName: userName,
        };
        // setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>编辑用户</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit} className="add-form">
                    <FormLabel required>New User Name</FormLabel>
                    <TextField
                        required
                        type="text"
                        size="small"
                        id="ledger_name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                    />
                </form>

                <form onSubmit={onSubmit} className="add-form">
                    <FormLabel required>New Password</FormLabel>
                    <TextField
                        required
                        type="text"
                        size="small"
                        id="ledger_name"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
