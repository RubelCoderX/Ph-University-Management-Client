import MySchedule from "../pages/student/MySchedule";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentOfferedCourse from "../pages/student/StudentOfferedCourse";

export const studentPaths = [
  {
    name: "Student Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "My Offered Course",
    path: "offeredCourse",
    element: <StudentOfferedCourse />,
  },
  {
    name: "My Course Schedule",
    path: "schedule",
    element: <MySchedule />,
  },
];
