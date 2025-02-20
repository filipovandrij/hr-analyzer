import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const vacancyApi = createApi({
  reducerPath: "vacancyApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getVacancies: builder.mutation({
      query: () => ({
        url: "vacancy/list",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {},
      }),
    }),
    postVacancy: builder.mutation({
      query: (formData) => ({
        url: "vacancy/post",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      }),
    }),
  }),
});

export const { useGetVacanciesMutation, usePostVacancyMutation } = vacancyApi;
