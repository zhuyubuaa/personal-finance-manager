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
  const { open, onClose, selectedLedger } = props;
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

        const response = await fetch("http://localhost:8000/accountbook", {
          method: `${selectedLedger ? "put" : "post"}`,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            selectedLedger
              ? {
                  ab_name: ledgerName,
                  u_id: curUser?.userId,
                  ab_id: selectedLedger,
                }
              : {
                  ab_name: ledgerName,
                  u_id: curUser?.userId,
                }
          ),
        });
        if (response.status === 200) {
          // success(true);
          console.log("success");
        }
      }
    } catch (error) {
      console.log("Ledger add error", error);
      // fail(true);
    } finally {
      onClose();
    }
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedLedger ? "编辑账本" : "新建账本"}</DialogTitle>
      {nameError && (
        <Alert severity="warning" onClose={() => setNameError(false)}>
          Name not filled!
        </Alert>
      )}
      <DialogContent>
        <form onSubmit={onSubmit} className="add-form">
          <FormLabel required>New Ledger Name</FormLabel>
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
        <Button onClick={onSubmit}>{selectedLedger ? "Edit" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}
