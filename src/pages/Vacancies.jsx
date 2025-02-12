import { Helmet } from "react-helmet-async";
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
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";

const truncateText = (text, length, isExpanded, toggleFunc, id) => {
  if (isExpanded) return text;
  return text.length > length ? (
    <>
      {text.substring(0, length)}...
      <Button
        size="small"
        onClick={() => toggleFunc(id)}
        sx={{ textTransform: "none", padding: 0, minWidth: "auto" }}
      >
        Більше
      </Button>
    </>
  ) : (
    text
  );
};

const vacancies = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: "Senior React Developer",
  company: `Company ${i + 1}`,
  logo: "https://via.placeholder.com/100",
  views: Math.floor(Math.random() * 200),
  applications: Math.floor(Math.random() * 50),
  postedDate: `${Math.floor(Math.random() * 10) + 1} дней назад`,
  description:
    "We are looking for a Senior React Developer with expertise in Shopware to join our team. The ideal candidate has a strong background in modern front-end development and experience integrating with eCommerce platforms, particularly Shopware 6. You will work closely with designers, backend developers, and stakeholders to create seamless and high-performing eCommerce solutions.",
  location: i % 2 === 0 ? "Remote" : "On-site",
  fullTime: i % 3 === 0,
}));

const Vacancies = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [filterLocation, setFilterLocation] = useState(""); // Фильтр по местоположению
  const [filterFullTime, setFilterFullTime] = useState(false); // Фильтр по типу занятости

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Фильтрация списка вакансий
  const filteredVacancies = vacancies.filter((vacancy) => {
    return (
      (!filterLocation || vacancy.location === filterLocation) &&
      (!filterFullTime || vacancy.fullTime)
    );
  });

  return (
    <>
      <Helmet>
        <title>Вакансии - Lumi</title>
      </Helmet>

      <Container sx={{ marginTop: "40px" }}>
        <Box
          sx={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          {/* Список вакансий */}
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
                        {vacancy.company} • {vacancy.location}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {truncateText(
                        vacancy.description,
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
                    <Typography variant="body2" color="text.secondary">
                      Просмотры: {vacancy.views} | Отклики:{" "}
                      {vacancy.applications} | Опубликовано:{" "}
                      {vacancy.postedDate}
                    </Typography>
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
          {/* Блок с фильтрами */}
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

            {/* Фильтр по местоположению */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Локация</InputLabel>
              <Select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                <MenuItem value="Remote">Удаленно</MenuItem>
                <MenuItem value="On-site">Офис</MenuItem>
              </Select>
            </FormControl>

            {/* Фильтр по полной занятости */}
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
    </>
  );
};

export default Vacancies;
