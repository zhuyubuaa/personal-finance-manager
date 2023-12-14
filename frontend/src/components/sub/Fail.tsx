import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function Fail(props: any): JSX.Element {
  const { open, onClose } = props;

  useEffect(() => {
    setTimeout(() => onClose(0), 1000);
  }, [onClose]);

  return (
    <Dialog open={open} onClose={() => onClose(0)}>
      <DialogTitle>
        <ErrorOutlineIcon sx={{ fontSize: "100px", color: "#ef2840" }} />
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="h6"
          sx={{
            color: "#ef2840",
            textAlign: "center",
          }}
        >
          FAIL
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
