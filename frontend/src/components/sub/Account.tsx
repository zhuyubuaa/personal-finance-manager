import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormLabel,
  InputAdornment,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";

export default function Account(props: any): JSX.Element {
  const { open, onClose, selectedAccount } = props;
  const [accName, setAccName] = useState<string>("");
  const [accBalance, setAccBalance] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const curUser = useUserContext().currentUser;

  useEffect(() => {
    if (selectedAccount) {
      setAccName(selectedAccount.a_name);
      setAccBalance(selectedAccount.remaining);
    }
  }, [selectedAccount]);

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    setNameError(false);
    try {
      if (accName === "") {
        setNameError(true);
      } else if (accName && accBalance) {
        const newAccount = {
          a_name: accName,
          remaining: accBalance,
          u_id: curUser?.userId,
        };

        const response = await fetch("http://localhost:8000/account", {
          method: selectedAccount ? "put" : "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            selectedAccount
              ? {
                  ...newAccount,
                  a_id: selectedAccount.a_id,
                }
              : newAccount
          ),
        }).then((res) => res.json());

        if (response === 0) {
          console.log("success");
        }
      }
    } catch (error) {
      console.log("Account add error", error);
    } finally {
      onClose();
    }
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedAccount ? "修改账户" : "新建账户"}</DialogTitle>
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
            id="acc_name"
            value={accName}
            onChange={(e) => setAccName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <br />
          <FormLabel required>Balance</FormLabel>
          <TextField
            type="number"
            size="small"
            id="acc_balance"
            // value={accBalance}
            defaultValue={"0"}
            onChange={(e) => setAccBalance(e.target.value)}
            fullWidth
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: <InputAdornment position="end">¥</InputAdornment>,
            }}
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                  display: "none",
                },
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>{selectedAccount ? "Edit" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
}
