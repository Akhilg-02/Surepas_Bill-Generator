import { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import CustomersList from "../components/CustomersList";
import BillGenerator from "../components/BillGenerator";
import DrawerContent from "./Drawer";

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap style={{marginLeft:"1.5%"}}>
              Bill Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <DrawerContent
        handleNavigation={handleNavigation}
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px" }}>
        <Routes>
          <Route path="/" element={<BillGenerator />} />
          <Route path="/bill-generator" element={<BillGenerator />} />
          <Route path="/customers" element={<CustomersList />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
