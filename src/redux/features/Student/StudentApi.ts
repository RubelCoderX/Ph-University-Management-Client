import { baseApi } from "../../api/baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleData: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["student"],
    }),
    getMyOfferedCourse: builder.query({
      query: () => ({
        url: "/offered-course/my-offered-courses",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
  }),
});
