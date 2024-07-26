import { academicManagementApi } from "../../../redux/features/Admin/academicManagement.api";

const AcademicDepartment = () => {
  const { data: departmentData } =
    academicManagementApi.useGetAllAcademicDepartmentQuery(undefined);
  console.log(departmentData);
  return (
    <div>
      <h2>Welcome to the AcademicDepartment page</h2>
    </div>
  );
};

export default AcademicDepartment;
