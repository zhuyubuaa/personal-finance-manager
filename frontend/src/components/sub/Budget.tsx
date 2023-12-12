import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";

export default function Budget(props: any): JSX.Element {
  const { open, onClose, ledger } = props;
  const [budgetAmount, setBudgetAmount] = useState<number>(0);

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    const newBudget = {
      ab_id: ledger,
      b_amount: budgetAmount,
      type: "Dining", //change later
    };
    console.log("newBudget", newBudget);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Budget</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit} className="add-form">
          <FormLabel required>Budget Amount</FormLabel>
          <TextField
            type="number"
            size="small"
            id="budget_amount"
            defaultValue={0}
            onChange={(e) => setBudgetAmount(Number(e.target.value))}
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
