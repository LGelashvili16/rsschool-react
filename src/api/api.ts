import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SWAPIResponseInterface } from "../interfaces/interfaces";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (build) => ({
    personList: build.query<void, { page?: number; searchTerm?: string }>({
      query: ({ page, searchTerm }) => {
        return `people/?page=${page}&search=${searchTerm}`;
      },
    }),
    person: build.query<SWAPIResponseInterface, { name: string }>({
      query: ({ name }) => `people/?search=${name}`,
    }),
  }),
});

export const { usePersonListQuery, usePersonQuery } = api;
