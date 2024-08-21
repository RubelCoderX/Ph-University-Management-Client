import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyCourseStudent from "../pages/faculty/MyCourseStudent";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Course",
    path: "courses",
    element: <MyCourses />,
  },
  {
    path: "courses/:registerSemesterId/:courseId",
    element: <MyCourseStudent />,
  },
];
