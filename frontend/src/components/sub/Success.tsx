import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Success(props: any): JSX.Element {
  const { open, onClose: handleDialog } = props;
  const onCloseDialog = () => handleDialog(false);

  useEffect(() => {
    setTimeout(() => onCloseDialog(), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onClose={onCloseDialog}>
      <DialogTitle>
        <CheckCircleOutlineIcon sx={{ fontSize: "100px", color: "#50c75d" }} />
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" sx={{ color: "#50c75d" }}>
          SUCCESS
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
