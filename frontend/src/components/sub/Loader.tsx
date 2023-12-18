import { Box, CircularProgress } from "@mui/material";

export default function Loader():JSX.Element {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
