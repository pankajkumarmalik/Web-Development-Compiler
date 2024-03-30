import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { compilerSliceStateType } from "./compilerSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: "include",
  }),
  tagTypes: ["myCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation<
      { url: string; status: string },
      { fullCode: compilerSliceStateType["fullCode"]; title: string }
    >({
      query: (fullCode) => {
        console.log(fullCode);
        return {
          url: "/compiler/save",
          method: "POST",
          body: fullCode,
        };
      },
      invalidatesTags: ["myCodes"],
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
    login: builder.mutation<userInfoType, loginCredentialsType>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body: body,
      }),
    }),
    signup: builder.mutation<userInfoType, signupCredentialsType>({
      query: (body) => ({
        url: "user/signup",
        method: "POST",
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query<userInfoType, void>({
      query: () => ({
        url: "/user/user-details",
        cache: "no-store",
      }),
    }),
    getMyCodes: builder.query<
      { fullCode: compilerSliceStateType["fullCode"]; title: string },
      void
    >({
      query: () => "/user/my-codes",
      providesTags: ["myCodes"],
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useSignupMutation,
  useGetMyCodesQuery,
} = api;
