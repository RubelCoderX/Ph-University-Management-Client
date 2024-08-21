import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyFacultyOfferedCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enroll-courses/get-all-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["enrolledCourse"],
    }),
    addCourseMarks: builder.mutation({
      query: (data) => ({
        url: "/enroll-courses/update-enrolled-course",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["enrolledCourse"],
    }),
  }),
});
