import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  Tabs,
  Tab,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardHeader,
  IconButton as MuiIconButton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Autocomplete } from "@mui/material";

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "Node.js",
  "Express.js",
  "NestJS",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "GraphQL",
  "WebSockets",
  "Material-UI",
  "Tailwind CSS",
  "SCSS",
];

const AccountProfile = () => {
  const [profile, setProfile] = useState({
    position: "",
    category: "",
    skills: [],
    experience: 1,
    expectedSalary: "",
    expectedHourlySalary: "",
    country: "",
    city: "",
    languages: [],
    workExperience: [],
    name: "",
    surname: "",
    email: "",
    phone: "",
    telegram: "",
    whatsapp: "",
    linkedin: "",
    github: "",
    resume: null,
    avatar: null,
  });
  const [tabValue, setTabValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [newExperience, setNewExperience] = useState({
    position: "",
    period: "",
    skills: [],
    description: "",
    startDate: null,
    endDate: null,
    company: "",
  });

  const handleAddExperience = () => {
    setProfile((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
    }));
    setOpenModal(false);
    setNewExperience({
      position: "",
      period: "",
      skills: [],
      description: "",
      startDate: null,
      endDate: null,
      company: "",
    });
  };

  const handleDeleteExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Профиль соискателя
      </Typography>
      <Tabs
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#2C4C51" },
          "& .MuiTab-root.Mui-selected": { color: "#A8A495" },
        }}
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
      >
        <Tab label="Личные данные" />
        <Tab label="Рабочие данные" />
      </Tabs>

      {tabValue === 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton component="label">
              <Avatar sx={{ width: 80, height: 80 }} src={profile.avatar} />
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    avatar: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </IconButton>
          </Box>
          <TextField
            variant="standard"
            label="Имя"
            name="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Фамилия"
            name="surname"
            value={profile.surname}
            onChange={(e) =>
              setProfile({ ...profile, surname: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label="Email"
            name="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Телефон"
            name="phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            fullWidth
          />
          <TextField
            variant="standard"
            label="Telegram"
            name="telegram"
            value={profile.telegram}
            onChange={(e) =>
              setProfile({ ...profile, telegram: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label="WhatsApp"
            name="whatsapp"
            value={profile.whatsapp}
            onChange={(e) =>
              setProfile({ ...profile, whatsapp: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label="LinkedIn"
            name="linkedin"
            value={profile.linkedin}
            onChange={(e) =>
              setProfile({ ...profile, linkedin: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label="GitHub"
            name="github"
            value={profile.github}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            fullWidth
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
          >
            Загрузить резюме
            <input
              type="file"
              hidden
              onChange={(e) =>
                setProfile({ ...profile, resume: e.target.files[0] })
              }
            />
          </Button>
          <Button variant="contained" color="primary" fullWidth>
            Сохранить изменения
          </Button>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            variant="standard"
            label="Должность"
            name="position"
            value={profile.position}
            onChange={(e) =>
              setProfile({ ...profile, position: e.target.value })
            }
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Категория</InputLabel>
            <Select
              variant="standard"
              name="category"
              value={profile.category}
              onChange={(e) =>
                setProfile({ ...profile, category: e.target.value })
              }
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Marketing">Маркетинг</MenuItem>
              <MenuItem value="Finance">Финансы</MenuItem>
            </Select>
          </FormControl>

          {/* Мультиселект для навыков */}
          <Autocomplete
            multiple
            options={skillOptions}
            value={profile.skills}
            onChange={(e, newValue) =>
              setProfile({ ...profile, skills: newValue })
            }
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Навыки" />
            )}
          />

          <Typography gutterBottom>
            Опыт работы: {profile.experience} лет
          </Typography>
          <Slider
            min={1}
            max={15}
            value={profile.experience}
            onChange={(e, newValue) =>
              setProfile({ ...profile, experience: newValue })
            }
          />

          {/* Отображение списка опыта работы */}
          {profile.workExperience.map((exp, index) => (
            <Card key={index} sx={{ mt: 2 }}>
              <CardHeader
                title={exp.position}
                subheader={`Компания: ${
                  exp.company || "Не указано"
                } | Период: ${exp.startDate?.format("MM/YYYY") || "N/A"} - ${
                  exp.endDate?.format("MM/YYYY") || "Настоящее время"
                }`}
                action={
                  <MuiIconButton onClick={() => handleDeleteExperience(index)}>
                    <DeleteIcon />
                  </MuiIconButton>
                }
              />
              <CardContent>
                <Typography variant="body2">{exp.description}</Typography>
              </CardContent>
            </Card>
          ))}

          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Добавить опыт работы
          </Button>
          <Button variant="contained" color="primary" fullWidth>
            Сохранить изменения
          </Button>
        </Box>
      )}

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Добавить опыт работы</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Должность"
              fullWidth
              variant="standard"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience({ ...newExperience, position: e.target.value })
              }
            />
            <TextField
              label="Компания"
              fullWidth
              variant="standard"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <DatePicker
                  label="Дата начала"
                  value={newExperience.startDate}
                  onChange={(date) =>
                    setNewExperience({ ...newExperience, startDate: date })
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <DatePicker
                  label="Дата окончания"
                  value={newExperience.endDate}
                  onChange={(date) =>
                    setNewExperience({ ...newExperience, endDate: date })
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>
            <TextField
              label="Описание работы"
              fullWidth
              variant="standard"
              multiline
              rows={3}
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAddExperience}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountProfile;
