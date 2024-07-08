import { academicSemesterApi } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading } =
    academicSemesterApi.useGetAllSemestersQuery(undefined);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome to the AcademicSemester page</h2>
    </div>
  );
};

export default AcademicSemester;
