import CourseResult from "../pages/student/CourseResult";
import MySchedule from "../pages/student/MySchedule";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentOfferedCourse from "../pages/student/StudentOfferedCourse";
import StudentProfile from "../pages/student/StudentProfile";

export const studentPaths = [
  {
    name: "Student Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "My Offered Courses",
    path: "offeredCourse",
    element: <StudentOfferedCourse />,
  },
  {
    name: "My Course Schedules",
    path: "schedule",
    element: <MySchedule />,
  },
  {
    path: "result/:courseId",
    element: <CourseResult />,
  },
  {
    name: "My Profile",
    path: "student-profile",
    element: <StudentProfile />,
  },
];
