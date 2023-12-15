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
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

export default function Ledger(props: any): JSX.Element {
  const { open, onClose, success, fail } = props;
  const [ledgerName, setLedgerName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const curUser = useUserContext().currentUser;

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    try {
      if (ledgerName === "") {
        setNameError(true);
      } else {
        setNameError(false);
        const newAccBook = {
          ab_name: ledgerName,
          u_id: curUser?.userId,
        };
        const response = await fetch("http://localhost:8000/accountbook", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccBook),
        });
        if (response.status === 200) {
          success(true);
        }
      }
    } catch (error) {
      console.log("Ledge add error", error);
      fail(true);
    } finally {
      onClose();
    }
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新建账本</DialogTitle>
      {nameError && (
        <Alert severity="warning" onClose={() => setNameError(false)}>
          Name not filled!
        </Alert>
      )}
      <DialogContent>
        <form onSubmit={onSubmit} className="add-form">
          <FormLabel required>Name</FormLabel>
          <TextField
            required
            type="text"
            size="small"
            id="ledger_name"
            value={ledgerName}
            onChange={(e) => setLedgerName(e.target.value)}
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
