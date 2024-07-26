import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please Select Name" }),
  year: z.string({ required_error: "Please Select Year" }),
  startMonth: z.string({ required_error: "Please Select a Start Month" }),
  endMonth: z.string({ required_error: "Please Select a End Month" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please Write Faculty name" }),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please Write Department Name" }),
  academicFaculty: z.string({ required_error: "Please Write Faculty Name" }),
});
