import {
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import { People, Receipt, Logout } from "@mui/icons-material";
import { logout } from "../store/slices/authSlice";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const DrawerContent = ({
  handleNavigation,
  isDrawerOpen,
  handleDrawerToggle,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Drawer
      variant="temporary"
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      sx={{ "& .MuiDrawer-paper": { width: drawerWidth }, cursor:"pointer" }}
    >
      <Box>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Bill Management
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => handleNavigation("/dashboard/customers")}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Customers List" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation("/dashboard/bill-generator")}
          >
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Bill Generator" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerContent;
