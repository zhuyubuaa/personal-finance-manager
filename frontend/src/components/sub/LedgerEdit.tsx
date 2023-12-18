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

export default function LedgerEdit(props: any): JSX.Element {
    const {open, onClose, ledgerId} = props;
    const [name, setName] = useState<string>("");
    const curUser = useUserContext().currentUser;

    const onSubmit = async (event: any): Promise<any> => {
        event.preventDefault();
        try {
            const editedLedger = {
                ab_name: name,
                ab_id: ledgerId,
            };
            const response = await fetch("http://localhost:8000/accountbook", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(editedLedger),
            });

        } catch (error) {
            console.log("ledger edit error", error);
        } finally {
            onClose();
        }
        window.location.reload();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>编辑账本</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit} className="add-form">
                    <FormLabel required>New Ledger Name</FormLabel>
                    <TextField
                        required
                        type="text"
                        size="small"
                        id="ledger_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
