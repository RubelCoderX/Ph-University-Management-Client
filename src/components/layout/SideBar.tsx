import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { superAdminPaths } from "../../routes/superadmin.routes";
const { Sider } = Layout;
const userRole = {
  ADMIN: "admin",
  Faculty: "faculty",
  STUDENT: "student",
  SUPERADMIN: "superAdmin",
};
const SideBar = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;
  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);

      break;
    case userRole.Faculty:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.Faculty);

      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;
    case userRole.SUPERADMIN:
      console.log("superadmin");
      sidebarItems = sidebarItemsGenerator(
        superAdminPaths,
        userRole.SUPERADMIN
      );
      break;

    default:
      break;
  }
  return (
    <Sider
      theme="dark"
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "sticky",
        left: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>FutureAcademy University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default SideBar;
