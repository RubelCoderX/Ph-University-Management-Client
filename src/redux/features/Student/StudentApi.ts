import { TQueryParam, TResponseRedux } from "../../../types";
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
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-course/my-offered-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["enrolledCourse"],
    }),
    // enroll course
    enrollCourses: builder.mutation({
      query: (data) => ({
        url: "/enroll-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["enrolledCourse"],
    }),
    getMySchedule: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enroll-courses/my-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["enrolledCourse"],
    }),
    getEnrolledCoursesResult: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/enroll-courses/get-enrolled-courses-result",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["enrolledCourse"],
    }),
  }),
});
