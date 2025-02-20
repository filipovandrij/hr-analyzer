import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Candidates from "../pages/Candidates";

import { Box } from "@mui/material";
import Vacancies from "../pages/Vacancies";
import VacancyDetail from "../pages/VacancyDetail";
import AccountProfile from "../pages/account/AccountProfile";
import Navbar from "../components/Navbar";
import VacancyForm from "../components/VacancyForm";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Box
        sx={{
          maxWidth: "1190px",
          margin: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/vacancyform" element={<VacancyForm />} />
          <Route path="/vacancies/:id" element={<VacancyDetail />} />
          <Route path="/account" element={<AccountProfile />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default AppRouter;
