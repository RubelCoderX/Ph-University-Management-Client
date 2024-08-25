import AdminAllData from "../pages/superAdmin/AdminAllData";
import AdminSingleDataDetails from "../pages/superAdmin/AdminSingleDataDetails";
import AdminUpdate from "../pages/superAdmin/AdminUpdate";
import CreateAdmin from "../pages/superAdmin/CreateAdmin";
import SuperAdminDashboard from "../pages/superAdmin/SuperAdminDashboard";

export const superAdminPaths = [
  {
    name: "Super A. Dashboard",
    path: "dashboard",
    element: <SuperAdminDashboard />,
  },
  {
    name: "Admins Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin></CreateAdmin>,
      },
      {
        name: "Total Admins",
        path: "tatal-admin",
        element: <AdminAllData></AdminAllData>,
      },
      {
        path: "admin-update/:adminId",
        element: <AdminUpdate></AdminUpdate>,
      },
      {
        path: "admin-data/:adminId",
        element: <AdminSingleDataDetails></AdminSingleDataDetails>,
      },
    ],
  },
];
