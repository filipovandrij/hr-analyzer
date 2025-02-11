import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Candidates from "../pages/Candidates";
import Vacancies from "../pages/Vacancies";
import VacancyDetail from "../pages/VacancyDetail";
import AccountProfile from "../pages/account/AccountProfile";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

const AppRouter = () => {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: "80px",
            overflow: "auto",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/vacancies/:id" element={<VacancyDetail />} />
            <Route path="/account" element={<AccountProfile />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default AppRouter;
