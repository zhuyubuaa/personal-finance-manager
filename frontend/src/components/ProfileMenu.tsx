import { Menu, MenuItem } from "@mui/material";
import { useUserContext } from "../context/UserContext";

export default function ProfileMenu({ openMenu, anchorEl, onClose }: any) {
  const { handleLogout } = useUserContext();

  const onLogout = (): void => {
    handleLogout();
    onClose();
  };

  return (
    <Menu open={openMenu} anchorEl={anchorEl} onClose={onClose}>
      <MenuItem onClick={onLogout}>Logout</MenuItem>
    </Menu>
  );
}
