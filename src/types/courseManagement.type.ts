import { TAcademicSemester } from "./academicManagement.type";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TFaculty,
} from "./userManagement.type";

export type TSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
};
export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: PreRequisiteCourse[];
};
export type PreRequisiteCourse = {
  course: string;
  isDeleted: boolean;
};

export type TOfferedCourses = {
  _id: string;
  semesterRegistration: TSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  academicSemester: TAcademicSemester;
  course: TCourse;
  faculty: TFaculty;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
};
