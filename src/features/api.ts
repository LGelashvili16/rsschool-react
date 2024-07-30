import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swapi.dev/api/",
  }),
  endpoints: (build) => ({
    personList: build.query<void, void>({
      query() {
        return "people";
      },
    }),
  }),
});

export const { usePersonListQuery } = api;
