import { TOfferedCourses, TSemester } from "./courseManagement.type";
import { TStudent } from "./userManagement.type";

export type TMarks = {
  semesterRegistration: TSemester;
  offeredCourse: TOfferedCourses;
  student: TStudent;
  courseMarks: TCourseMarks;
};
export type TCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};
