import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const vacancies = [
  { id: 1, title: "Frontend Developer", description: "React, TypeScript, Redux", details: "Full job description for Frontend Developer." },
  { id: 2, title: "Backend Developer", description: "Node.js, Express, PostgreSQL", details: "Full job description for Backend Developer." },
  { id: 3, title: "UI/UX Designer", description: "Figma, Adobe XD, UX research", details: "Full job description for UI/UX Designer." },
];

const VacancyDetail = () => {
  const { id } = useParams();
  const vacancy = vacancies.find((v) => v.id === Number(id));

  if (!vacancy) {
    return <h2>Вакансия не найдена</h2>;
  }

  return (
    <>
      <Helmet>
        <title>{vacancy.title} - Lumi</title>
      </Helmet>
      <h1>{vacancy.title}</h1>
      <p>{vacancy.details}</p>
    </>
  );
};

export default VacancyDetail;
