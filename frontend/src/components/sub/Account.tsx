import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function Account(props: any): JSX.Element {
  const { open, onClose } = props;
  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新建账户</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input type="text" />
          <label>Balance</label>
          <input type="number" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
