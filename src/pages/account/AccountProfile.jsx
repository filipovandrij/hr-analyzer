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
import i18n from "i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Autocomplete } from "@mui/material";
import "../../locales/i18n";
import EnFlag from "../../icons/flags/EnFlag";
import UkFlag from "../../icons/flags/UkFlag";
import RuFlag from "../../icons/flags/RuFlag";
import GeFlag from "../../icons/flags/GeFlag";
import DeFlag from "../../icons/flags/DeFlag";

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
  const { t } = useTranslation();
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
  const [editingExperience, setEditingExperience] = useState(null);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const [language, setLanguage] = useState("en");

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    changeLanguage(selectedLanguage);
  };
  const validateFields = () => {
    let isValid = true;

    if (!newExperience.position.trim()) {
      toast.error(t("enter_position"));
      isValid = false;
    }
    if (!newExperience.company.trim()) {
      toast.error(t("enter_company_name"));
      isValid = false;
    }
    if (!newExperience.startDate) {
      toast.error(t("select_start_date"));
      isValid = false;
    }
    if (!newExperience.endDate) {
      toast.error(t("select_end_date"));
      isValid = false;
    }
    if (!newExperience.description.trim()) {
      toast.error(t("enter_work_description"));
      isValid = false;
    }

    return isValid;
  };

  const handleSaveProfile = () => {
    toast.success(t("profile_successfully_saved"));
  };
  // Функция для редактирования опыта работы
  const handleEditExperience = (index) => {
    const experienceToEdit = profile.workExperience[index];
    setNewExperience({ ...experienceToEdit });
    setEditingExperience({ ...experienceToEdit, index });
    setOpenModal(true);
  };

  const handleSaveExperience = () => {
    if (!validateFields()) return;

    setProfile((prev) => {
      const updatedWorkExperience = [...prev.workExperience];

      if (editingExperience !== null) {
        updatedWorkExperience[editingExperience.index] = newExperience;
        toast.success(t("changes_saved"));
      } else {
        updatedWorkExperience.push(newExperience);
        toast.success(t("work_experience_added"));
      }

      return { ...prev, workExperience: updatedWorkExperience };
    });

    setOpenModal(false);
    setEditingExperience(null);
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
      <ToastContainer position="top-right" autoClose={3000} />
      <Typography variant="h4" gutterBottom>
        {t("profile_applicant")}
      </Typography>
      <Tabs
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#2C4C51" },
          "& .MuiTab-root.Mui-selected": { color: "#A8A495" },
        }}
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
      >
        <Tab label={t("personal_data")} />
        <Tab label={t("work_data")} />
        <Tab label={t("settings")} />
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
            label={t("name")}
            name="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            fullWidth
          />
          <TextField
            variant="standard"
            label={t("surname")}
            name="surname"
            value={profile.surname}
            onChange={(e) =>
              setProfile({ ...profile, surname: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label={t("email")}
            name="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            fullWidth
          />
          <TextField
            variant="standard"
            label={t("phone")}
            name="phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            fullWidth
          />
          <TextField
            variant="standard"
            label={t("telegram")}
            name="telegram"
            value={profile.telegram}
            onChange={(e) =>
              setProfile({ ...profile, telegram: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label={t("whatsapp")}
            name="whatsapp"
            value={profile.whatsapp}
            onChange={(e) =>
              setProfile({ ...profile, whatsapp: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label={t("linkedin")}
            name="linkedin"
            value={profile.linkedin}
            onChange={(e) =>
              setProfile({ ...profile, linkedin: e.target.value })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label={t("github")}
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
            {t("upload_resume")}
            <input
              type="file"
              hidden
              onChange={(e) =>
                setProfile({ ...profile, resume: e.target.files[0] })
              }
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveProfile}
          >
            {t("save_changes")}
          </Button>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            variant="standard"
            label={t("position")}
            name="position"
            value={profile.position}
            onChange={(e) =>
              setProfile({ ...profile, position: e.target.value })
            }
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>{t("category")}</InputLabel>
            <Select
              variant="standard"
              name="category"
              value={profile.category}
              onChange={(e) =>
                setProfile({ ...profile, category: e.target.value })
              }
            >
              <MenuItem value="IT">{t("it")}</MenuItem>
              <MenuItem value="Marketing">{t("marketing")}</MenuItem>
              <MenuItem value="Finance">{t("finance")}</MenuItem>
            </Select>
          </FormControl>
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
              <TextField {...params} variant="standard" label={t("skills")} />
            )}
          />
          <Typography gutterBottom>
            {t("work_experience")} : {profile.experience}
          </Typography>
          <Slider
            min={1}
            max={15}
            value={profile.experience}
            onChange={(e, newValue) =>
              setProfile({ ...profile, experience: newValue })
            }
          />
          {profile.workExperience.map((exp, index) => (
            <Card key={index} sx={{ mt: 2 }}>
              <CardHeader
                title={exp.position}
                subheader={`${t("company")}: ${
                  exp.company || t("not_specified")
                } | ${t("period")}: ${
                  exp.startDate?.format("MM/YYYY") || "N/A"
                } - ${exp.endDate?.format("MM/YYYY") || t("current_time")}`}
                action={
                  <Box>
                    <MuiIconButton onClick={() => handleEditExperience(index)}>
                      <EditIcon />
                    </MuiIconButton>
                    <MuiIconButton
                      onClick={() => handleDeleteExperience(index)}
                    >
                      <DeleteIcon />
                    </MuiIconButton>
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="body2">{exp.description}</Typography>
              </CardContent>
            </Card>
          ))}

          <Button variant="contained" onClick={() => setOpenModal(true)}>
            {t("add_work_experience")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveProfile}
          >
            {t("save_changes")}
          </Button>
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Select value={language} onChange={handleChange} displayEmpty>
            <MenuItem value="en">
              <EnFlag width="20" height="15" style={{ marginRight: 8 }} />
              English
            </MenuItem>
            <MenuItem value="uk">
              <UkFlag width="20" height="15" style={{ marginRight: 8 }} />
              Українська
            </MenuItem>
            <MenuItem value="ru">
              <RuFlag width="20" height="15" style={{ marginRight: 8 }} />
              Русский
            </MenuItem>
            <MenuItem value="ge">
              <GeFlag width="20" height="15" style={{ marginRight: 8 }} />
              ქართული
            </MenuItem>
            <MenuItem value="de">
              <DeFlag width="20" height="15" style={{ marginRight: 8 }} />
              Deutsch
            </MenuItem>
          </Select>
        </Box>
      )}

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>
          {editingExperience !== null
            ? t("edit_work_experience")
            : t("add_work_experience")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label={t("position")}
              fullWidth
              variant="standard"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience({ ...newExperience, position: e.target.value })
              }
            />
            <TextField
              label={t("company")}
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
                  label={t("start_date")}
                  value={newExperience.startDate}
                  onChange={(date) =>
                    setNewExperience({ ...newExperience, startDate: date })
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <DatePicker
                  label={t("end_date")}
                  value={newExperience.endDate}
                  onChange={(date) =>
                    setNewExperience({ ...newExperience, endDate: date })
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>
            <TextField
              label={t("work_description")}
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
          <Button onClick={() => setOpenModal(false)}>{t("cancel")}</Button>
          <Button variant="contained" onClick={handleSaveExperience}>
            {editingExperience !== null ? t("save_changes") : t("add")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountProfile;
