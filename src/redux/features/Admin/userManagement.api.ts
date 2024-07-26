import { TQueryParam, TResponseRedux } from "./../../../types/global";
import { baseApi } from "../../api/baseApi";
import { TAdminData, TStudent } from "../../../types";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
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
    }),
    getStudentById: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
    }),
    updateStudent: builder.mutation({
      query: ({ data, studentId }) => ({
        url: `/students/${studentId}`,
        method: "PUT",
        body: data,
      }),
    }),
    // for admin api
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
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
    }),
    // for faculty api
  }),
});
