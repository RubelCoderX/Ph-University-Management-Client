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
import AdminDetails from "../pages/admin/userManagement/AdminDetails";
import FacultyData from "../pages/admin/userManagement/FacultyData";
import FacultiesDetails from "../pages/admin/userManagement/FacultiesDetails";
import AdminUpdate from "../pages/admin/userManagement/AdminUpdate";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import RegisteredSemester from "../pages/admin/courseManagement/RegisteredSemester";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import Courses from "../pages/admin/courseManagement/Courses";
import OfferedCourses from "../pages/admin/courseManagement/OfferedCourses";
import OfferedCourse from "../pages/admin/courseManagement/OfferedCourse";

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
        path: "admin-data/:adminId",
        element: <AdminDetails></AdminDetails>,
      },
      {
        path: "admin-update/:adminId",
        element: <AdminUpdate></AdminUpdate>,
      },

      {
        name: "Create Faculty",
        path: "faculty-data",
        element: <CreateFaculty></CreateFaculty>,
      },
      {
        name: "Faculties",
        path: "create-faculty",
        element: <FacultyData></FacultyData>,
      },
      {
        path: "faculty-data/:facultyId",
        element: <FacultiesDetails></FacultiesDetails>,
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
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },

      {
        name: "Offered Course",
        path: "offered-course",
        element: <OfferedCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
    ],
  },
];
