import { useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Menu as MenuIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"
import { logout } from "../store/slices/authSlice"
import CustomersList from "../components/CustomersList"
import BillGenerator from "../components/BillGenerator"

const drawerWidth = 240

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const handleNavigation = (path) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Bill Management
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem
          button
          selected={location.pathname === "/dashboard/customers"}
          onClick={() => handleNavigation("/dashboard/customers")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customers List" />
        </ListItem>
        <ListItem
          button
          selected={location.pathname === "/dashboard/bill-generator"}
          onClick={() => handleNavigation("/dashboard/bill-generator")}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Bill Generator" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {location.pathname.includes("customers") ? "Customers List" : "Bill Generator"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: "64px",
        }}
      >
        <Routes>
          <Route path="/" element={<CustomersList />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/bill-generator" element={<BillGenerator />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default Dashboard

