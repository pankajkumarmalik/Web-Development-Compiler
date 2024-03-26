import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { compilerSliceStateType } from "./compilerSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      { url: string; status: string },
      compilerSliceStateType["fullCode"]
    >({
      query: (fullCode) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode,
        };
      },
    }),
    loadCode: builder.mutation<
      { fullCode: compilerSliceStateType["fullCode"] },
      { urlId: string }
    >({
      query: (body) => ({
        url: "/compiler/load",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useSaveCodeMutation, useLoadCodeMutation } = api;
