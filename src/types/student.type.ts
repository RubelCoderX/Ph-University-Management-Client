import { TAcademicSemester } from "./academicManagement.type";
import { TCourse, TSemester } from "./courseManagement.type";
import { TAcademicDepartment, TAcademicFaculty } from "./userManagement.type";

export type TStudentCourse = {
  _id: string;
  semesterRegistration: TSemester;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  course: TCourse;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  isAlreadyEnrolled: boolean;
};
