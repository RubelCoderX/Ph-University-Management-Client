import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";

import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";

import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicFacutly from "../pages/admin/academicManagement/CreateAcademicFacutly";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import StudentData from "../pages/admin/userManagement/StudentData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import StudentUpdate from "../pages/admin/userManagement/StudentUpdate";
import AdminData from "../pages/admin/userManagement/AdminData";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semesters",
        element: <CreateAcademicSemester></CreateAcademicSemester>,
      },
      {
        name: "Academic Semester",
        path: "academic-semesters",
        element: <AcademicSemester></AcademicSemester>,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFacutly></CreateAcademicFacutly>,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty></AcademicFaculty>,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment></CreateAcademicDepartment>,
      },

      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment></AcademicDepartment>,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "student-data",
        element: <StudentData></StudentData>,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        name: "Admins",
        path: "admin-data",
        element: <AdminData></AdminData>,
      },

      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails></StudentDetails>,
      },
      {
        path: "student-update/:studentId",
        element: <StudentUpdate></StudentUpdate>,
      },
    ],
  },
];

//* Programatical way

//! Hard coded way

// export const adminPaths = [
//   {
//     path: 'dashboard',
//     element: <AdminDashboard />,
//   },
//   {
//     path: 'create-student',
//     element: <CreateStudent />,
//   },
//   {
//     path: 'create-admin',
//     element: <CreateAdmin />,
//   },
//   {
//     path: 'create-faculty',
//     element: <CreateFaculty />,
//   },
// ];
