import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Candidates from "../pages/Candidates";
import Vacancies from "../pages/Vacancies";
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
            overflow: "auto" 
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/vacancies" element={<Vacancies />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default AppRouter;
