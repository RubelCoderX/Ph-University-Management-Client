import { TQueryParam, TResponseRedux } from "./../../../types/global";
import { baseApi } from "../../api/baseApi";
import { TAdminData, TFaculty, TStudent } from "../../../types";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["student"],
    }),
    getAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["student"],
    }),
    getStudentById: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
      providesTags: ["student"],
    }),
    updateStudent: builder.mutation({
      query: ({ data, studentId }) => ({
        url: `/students/${studentId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["student"],
    }),
    deleteStudent: builder.mutation({
      query: (studentId: string) => ({
        url: `/students/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
    // for status changed
    statusChanged: builder.mutation<
      void,
      { id: string; status: "in-progress" | "blocked" }
    >({
      query: ({ id, status }) => {
        return {
          url: `/users/change-status/${id}`,
          method: "POST",
          body: { status },
        };
      },
      invalidatesTags: ["student", "admin", "faculty"],
    }),

    // for admin api
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    getAdminById: builder.query({
      query: (adminId) => ({
        url: `/admins/${adminId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    getAllAdmin: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdminData[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (adminId: string) => {
        return {
          url: `/admins/${adminId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["admin"],
    }),
    updateAdmin: builder.mutation({
      query: ({ data, adminId }) => ({
        url: `/admins/${adminId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // for faculty api
    addFaculty: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["faculty"],
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["faculty"],
    }),
    getFacultyById: builder.query({
      query: (facultyId) => ({
        url: `/faculties/${facultyId}`,
        method: "GET",
      }),
      providesTags: ["faculty"],
    }),
    deleteFaculty: builder.mutation({
      query: (facultyId: string) => {
        return {
          url: `/faculties/${facultyId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["faculty"],
    }),
    addChangePassword: builder.mutation({
      query: (data) => {
        return {
          url: "auth/change-password",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});
