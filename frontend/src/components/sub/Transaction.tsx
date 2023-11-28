import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function Transaction(props: any): JSX.Element {
  const { open, onClose } = props;

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新建日志</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <label>Amount</label>
          <input type="text" />
          <br />
          
          <label>Type</label>
          <select>
            <option>Expense</option>
            <option>Income</option>
          </select>
          <br />

          <label>Category</label>
          <select>
            <option>Food</option>
            <option>Transportation</option>
          </select>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
