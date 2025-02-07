import { useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import { Home, People, Work } from "@mui/icons-material";
import { Link } from "react-router-dom";

const menuItems = [
  { text: "Home", icon: <Home />, path: "/" },
  { text: "Candidates", icon: <People />, path: "/candidates" },
  { text: "Vacancies", icon: <Work />, path: "/vacancies" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <Paper
      elevation={3}
      sx={{
        width: 100,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 0",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Avatar
        alt="Logo"
        src="/hr_logo.png"
        sx={{ width: 50, height: 50, mb: 2 }}
      />
      <Divider sx={{ width: "80%" }} />

      <List
        sx={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  minWidth: 60,
                  padding: "10px 5px",
                  textAlign: "center",
                  backgroundColor: isActive ? "#CDCAC0" : "transparent",
                  borderRadius: "8px",
                  animation: isActive
                    ? "pulse 1.5s infinite alternate"
                    : "none",
                  "@keyframes pulse": {
                    "0%": { backgroundColor: "#CDCAC0" },
                    "100%": { backgroundColor: "#BFBBA5" },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "auto",
                    color: isActive ? "black" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    textAlign: "center",
                    fontSize: "12px",
                    whiteSpace: "nowrap",
                    color: isActive ? "black" : "inherit",
                    fontWeight: isActive ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ width: "80%" }} />

      {/* Аватар профиля */}
      <Avatar
        alt="Profile"
        src="/homer.png"
        sx={{ width: 50, height: 50, mb: 2, mt: "auto" }}
      ></Avatar>
    </Paper>
  );
};

export default Navbar;
