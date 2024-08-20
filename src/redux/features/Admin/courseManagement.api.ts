import {
  TCourse,
  TOfferedCourses,
  TQueryParam,
  TResponseRedux,
  TSemester,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistration: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/semester-registration",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["semester"],
    }),

    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    updateSemesterStatus: builder.mutation({
      query: (args) => ({
        url: `/semester-registration/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    // course api
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["course"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["course"],
    }),

    getCourseFaculties: builder.query({
      query: (args) => ({
        url: `/courses/${args.courseId}/get-faculties`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    // offered Course Api
    addOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-course/create-offered-course",
        method: "POST",
        body: data,
      }),
    }),
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/offered-course",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TOfferedCourses[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offeredCourses"],
    }),
  }),
});
