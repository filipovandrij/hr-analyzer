import { useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  Box,
} from "@mui/material";
import { Home, People, Work } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const menuItems = [
  { text: "home", icon: <Home />, path: "/" },
  { text: "candidates", icon: <People />, path: "/candidates" },
  { text: "vacancies", icon: <Work />, path: "/vacancies" },
];

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "10px 0 0",
        marginBottom: "10px",
        position: "fixed",
        backgroundColor: "white",
        top: 0,
        left: 0,
        zIndex: 1100,
        borderRadius: "12px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: "1100px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: "#fff",
          borderRadius: "12px",
        }}
      >
        <Avatar alt="Logo" src="/hr_logo.png" sx={{ width: 50, height: 50 }} />

        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                    padding: "8px 15px",
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
                    primary={t(`${item.text}`)}
                    sx={{
                      textAlign: "center",
                      fontSize: "14px",
                      color: isActive ? "black" : "inherit",
                      fontWeight: isActive ? "bold" : "normal",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Link to="/account" style={{ textDecoration: "none" }}>
          <Avatar
            alt={t("profile")}
            src="/homer.png"
            sx={{
              width: 50,
              height: 50,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
        </Link>
      </Paper>
    </Box>
  );
};

export default Navbar;
