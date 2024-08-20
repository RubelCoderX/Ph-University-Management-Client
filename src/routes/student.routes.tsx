import StudentDashboard from "../pages/student/StudentDashboard";
import StudentOfferedCourse from "../pages/student/StudentOfferedCourse";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "My Offered Course",
    path: "offeredCourse",
    element: <StudentOfferedCourse />,
  },
];
