import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    keepUnusedDataFor: 60,
    tagTypes: [
       
    ],
    endpoints: () => ({}),
});
