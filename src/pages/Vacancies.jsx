import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, Avatar, Typography, Button, CardActions, Box } from "@mui/material";
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
  ) : text;
};

const vacancies = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: "Senior React Developer",
  company: `Company ${i + 1}`,
  logo: "https://via.placeholder.com/100",
  views: Math.floor(Math.random() * 200),
  applications: Math.floor(Math.random() * 50),
  postedDate: `${Math.floor(Math.random() * 10) + 1} дней назад`,
  description: "We are looking for a Senior React Developer with expertise in Shopware to join our team. The ideal candidate has a strong background in modern front-end development and experience integrating with eCommerce platforms, particularly Shopware 6. You will work closely with designers, backend developers, and stakeholders to create seamless and high-performing eCommerce solutions.",
}));

const Vacancies = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <Helmet>
        <title>Вакансии - Lumi</title>
      </Helmet>
      <h1>Вакансии</h1>
      <div>
        {vacancies.map((vacancy) => (
          <Card key={vacancy.id} sx={{ maxWidth: 600, marginBottom: 2, padding: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={vacancy.logo} alt={vacancy.company} sx={{ width: 56, height: 56 }} />
              <Box>
                <Typography variant="h5" component={Link} to={`/vacancies/${vacancy.id}`} sx={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  {vacancy.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {vacancy.company}
                </Typography>
              </Box>
            </Box>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {truncateText(vacancy.description, 150, expandedId === vacancy.id, toggleDescription, vacancy.id)}
              </Typography>
              {expandedId === vacancy.id && (
                <Button size="small" onClick={() => toggleDescription(vacancy.id)} sx={{ textTransform: "none", padding: 0, minWidth: "auto" }}>Скрыть</Button>
              )}
              <Typography variant="body2" color="text.secondary">
                Просмотры: {vacancy.views} | Отклики: {vacancy.applications} | Опубликовано: {vacancy.postedDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="primary">Откликнуться</Button>
              <Button size="small" variant="outlined">Сохранить</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Vacancies;