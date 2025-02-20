import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const locationOptions = ["Remote", "On-site", "Hybrid", "Relocate"];

const VacancyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    views: 0,
    applications: 0,
    employment_options: [],
    fulltime: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLocationChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, employment_options: newValue }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Название вакансии обязательно");
      return false;
    }
    if (!formData.company.trim()) {
      toast.error("Название компании обязательно");
      return false;
    }
    if (formData.employment_options.length === 0) {
      toast.error("Выберите хотя бы один вариант локации");
      return false;
    }
    if (formData.description.length < 500) {
      toast.error("Описание должно содержать минимум 500 символов");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await fetch(
        "http://localhost:9000/api/v1/vacancy/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      toast.success("Вакансия успешно опубликована!");
      console.log("Success:", result);
      setFormData({
        title: "",
        description: "",
        company: "",
        views: 0,
        applications: 0,
        employment_options: [],
        fulltime: true,
      });
    } catch (error) {
      toast.error("Ошибка при отправке вакансии");
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Vacancy Form - Lumi</title>
      </Helmet>
      <Container sx={{ width: "600px", marginTop: "40px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Опубликовать вакансию
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Название вакансии"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Компания"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />
          <Autocomplete
            multiple
            options={locationOptions}
            value={formData.employment_options}
            onChange={handleLocationChange}
            renderInput={(params) => (
              <TextField {...params} label="Локация" fullWidth />
            )}
          />
          <TextField
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={4}
            inputProps={{ style: { resize: "vertical" } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="fulltime"
                checked={formData.fulltime}
                onChange={handleChange}
              />
            }
            label="Полная занятость"
          />
          <Button type="submit" variant="contained" color="primary">
            Отправить
          </Button>
        </Box>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default VacancyForm;
