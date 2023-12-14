import { useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "../styles/components/sidemenu.css";

export default function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className="side-menu">
      <List className="side-menu-list">
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="HOME" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="PROFILE" />
        </ListItemButton>
      </List>
    </div>
  );
}
