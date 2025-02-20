import { Typography, Tooltip } from "@mui/material";
import { formatDistanceToNow, format } from "date-fns";
import { enUS, uk, ru, ka, de } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const locales = {
  en: enUS,
  uk: uk,
  ru: ru,
  ge: ka,
  de: de,
};

const VacancyInfo = ({ vacancy }) => {
  const { i18n } = useTranslation();
  const currentLocale = locales[i18n.language] || enUS;

  const createdDate = new Date(vacancy.created_at);

  return (
    <Typography variant="body2" color="text.secondary">
      Просмотры: {vacancy.views} | Отклики: {vacancy.applications} |{" "}
      <Tooltip
        title={format(createdDate, "yyyy-MM-dd HH:mm")}
        arrow
        followCursor
      >
        Опубликовано:{" "}
        {formatDistanceToNow(createdDate, {
          locale: currentLocale,
          addSuffix: true,
        })}
      </Tooltip>
    </Typography>
  );
};

export default VacancyInfo;
