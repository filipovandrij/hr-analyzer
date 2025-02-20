import { configureStore } from "@reduxjs/toolkit";
import { vacancyApi } from "./services/vacancyApi";

export const store = configureStore({
  reducer: {
    [vacancyApi.reducerPath]: vacancyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vacancyApi.middleware),
});

export default store;
