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
import { useState } from "react";

export default function Account(props: any): JSX.Element {
  const { open, onClose } = props;
  const [accName, setAccName] = useState<string>("");
  const [accBalance, setAccBalance] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    setNameError(false);
    if (accName === "") {
      setNameError(true);
    } else if (accName && accBalance) {
      const newAccount = {
        a_name: accName,
        remaining: accBalance,
      };
      console.log("newAccount", newAccount);

      const response = await fetch("http://localhost:8000/account", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });

      console.log("response", response);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新建账户</DialogTitle>
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
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
