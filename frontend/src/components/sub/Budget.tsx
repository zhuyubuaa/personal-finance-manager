import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormLabel,
  InputAdornment,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

interface OutType {
  typeName: string;
}

export default function Budget(props: any): JSX.Element {
  const { open, onClose, ledger, currentBudgets } = props;
  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const [types, setTypes] = useState<OutType[]>([]);
  const [budgetType, setBudgetType] = useState<string>("");

  useEffect(() => {
    getTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTypes = async (): Promise<any> => {
    try {
      const response = await fetch("http://localhost:8000/type", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const data = (await response.json()) as any;
        const expenseTypes = data["expense"];
        const filteredTypes = expenseTypes.filter(
          (type: any) =>
            !currentBudgets
              .map((budget: any) => budget.type_name)
              .includes(type.typeName)
        );
        setTypes(() => [...filteredTypes]);
      }
    } catch (error) {
      console.log("Error fetching type data", error);
    }
  };

  const onTypeChange = (newEvent: any) => {
    setBudgetType(() => newEvent.target.value);
  };

  const onSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    try {
      const newBudget = {
        ab_id: ledger,
        b_amount: budgetAmount,
        type_name: budgetType,
      };
      const response = await fetch("http://localhost:8000/budget", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudget),
      }).then((res) => res.json());

      if (response === 0) {
        //Add reload
        console.log("success");
      } else {
        console.log("Error Adding Budget");
      }
    } catch (error) {
      console.log("Budget add error", error);
    } finally {
      onClose();
    }
    window.location.reload();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Budget</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit} className="add-form">
          <FormControl sx={{ width: 552 }}>
            <FormLabel required>Budget Type</FormLabel>
            <Select
              value={budgetType}
              onChange={onTypeChange}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
            >
              {types[0] &&
                types.map((type, i) => (
                  <MenuItem key={i} value={type.typeName}>
                    {type.typeName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: 552 }}>
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
          </FormControl>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
