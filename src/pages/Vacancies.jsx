import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  CardActions,
  Box,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  ListItemText,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import VacancyInfo from "../components/VacanciesList/VacancyInfo";

const truncateText = (text = "", length, isExpanded, toggleFunc, id) => {
  if (isExpanded) return text;
  return text.length > length ? (
    <>
      {text.substring(0, length)}...
      <Button
        size="small"
        onClick={() => toggleFunc(id)}
        sx={{
          textTransform: "none",
          padding: 0,
          minWidth: "auto",
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        Більше
      </Button>
    </>
  ) : (
    <Typography
      component="span"
      sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
    >
      {text}
    </Typography>
  );
};

const Vacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [filterLocation, setFilterLocation] = useState([]); // Изначально пустой массив
  const [filterFullTime, setFilterFullTime] = useState(false); // Фильтр по типу занятости

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.post(
          "http://localhost:9000/api/v1/vacancy/list",
          {}
        );
        setVacancies(response.data.items);
      } catch (error) {
        console.error("Ошибка загрузки вакансий:", error);
      }
    };
    fetchVacancies();
  }, []);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Фильтрация списка вакансий
  const filteredVacancies = vacancies.filter((vacancy) => {
    return (
      (filterLocation.length === 0 ||
        filterLocation.some((loc) =>
          vacancy.employment_options.includes(loc)
        )) &&
      (!filterFullTime || vacancy.fullTime)
    );
  });

  return (
    <Container sx={{ marginTop: "40px" }}>
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                sx={{
                  maxWidth: 600,
                  width: "100%",
                  marginBottom: 4,
                  padding: 2,
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                  borderRadius: "12px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 6px 30px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={vacancy.logo}
                    alt={vacancy.company}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/vacancies/${vacancy.id}`}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      {vacancy.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {vacancy.company} •{" "}
                      {vacancy.employment_options.map(
                        (options) => options + " "
                      )}
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                  >
                    {truncateText(
                      vacancy.description || "",
                      150,
                      expandedId === vacancy.id,
                      toggleDescription,
                      vacancy.id
                    )}
                  </Typography>
                  {expandedId === vacancy.id && (
                    <Button
                      size="small"
                      onClick={() => toggleDescription(vacancy.id)}
                      sx={{
                        textTransform: "none",
                        padding: 0,
                        minWidth: "auto",
                      }}
                    >
                      Скрыть
                    </Button>
                  )}
                  <VacancyInfo vacancy={vacancy} />
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary">
                    Откликнуться
                  </Button>
                  <Button size="small" variant="outlined">
                    Сохранить
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography variant="body1">
              Нет вакансий по этим критериям
            </Typography>
          )}
        </Box>
        <Paper
          sx={{
            width: "280px",
            padding: "20px",
            borderRadius: "12px",
            position: "sticky",
            top: "120px",
            alignSelf: "start",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Фильтры
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Локация</InputLabel>
            <Select
              multiple
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              renderValue={(selected) => selected.join(", ")} // Отображает выбранные значения через запятую
            >
              <MenuItem value="Remote">
                <Checkbox checked={filterLocation.includes("Remote")} />
                <ListItemText primary="Remote" />
              </MenuItem>
              <MenuItem value="On-site">
                <Checkbox checked={filterLocation.includes("On-site")} />
                <ListItemText primary="On-site" />
              </MenuItem>
              <MenuItem value="Hybrid">
                <Checkbox checked={filterLocation.includes("Hybrid")} />
                <ListItemText primary="Hybrid" />
              </MenuItem>
              <MenuItem value="Relocate">
                <Checkbox checked={filterLocation.includes("Relocate")} />
                <ListItemText primary="Relocate" />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterFullTime}
                onChange={(e) => setFilterFullTime(e.target.checked)}
              />
            }
            label="Только Full-Time"
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Vacancies;
