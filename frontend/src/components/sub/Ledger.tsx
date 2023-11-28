import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function Ledger(props: any): JSX.Element {
  const { open, onClose } = props;

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新建账本</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <label>账本名字</label>
          <input type="text" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
