import { Card, Col, Row, Spin, Alert } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { userManagementApi } from "../../redux/features/Admin/userManagement.api";
import { courseManagementApi } from "../../redux/features/Admin/courseManagement.api";
import FacultyList from "../../utils/facultyList";
import StudentList from "../../utils/studentList";

const AdminDashboard = () => {
  const {
    data: studentData,
    isLoading,
    isError,
  } = userManagementApi.useGetAllStudentQuery(undefined);
  const { data: facultyData } =
    userManagementApi.useGetAllFacultiesQuery(undefined);
  const { data: courseData } =
    courseManagementApi.useGetAllCoursesQuery(undefined);

  if (isLoading) {
    return <Spin style={{ marginTop: "30px" }} tip="Loading..." />;
  }

  if (isError) {
    return (
      <Alert message="Error" description="Failed to fetch data." type="error" />
    );
  }

  const totalStudents = studentData?.meta?.total || 0;
  const totalFaculties = facultyData?.meta?.total || 0;
  const totalCourses = courseData?.meta?.total || 0;

  return (
    <div>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "30px" }}>Admin Dashboard</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Total Students"
              bordered={false}
              style={{ borderRadius: 8 }}
              bodyStyle={{ padding: "20px" }}
            >
              <Row align="middle">
                <Col span={8}>
                  <UserOutlined
                    style={{ fontSize: "40px", color: "#1890ff" }}
                  />
                </Col>
                <Col span={16}>
                  <h3>{totalStudents}</h3>
                  <p>45% Increase in 28 Days</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              title="Total Faculties"
              bordered={false}
              style={{ borderRadius: 8 }}
              bodyStyle={{ padding: "20px" }}
            >
              <Row align="middle">
                <Col span={8}>
                  <UserOutlined
                    style={{ fontSize: "40px", color: "#ffa940" }}
                  />
                </Col>
                <Col span={16}>
                  <h3>{totalFaculties}</h3>
                  <p>40% Increase in 28 Days</p>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Card
              title="Total Courses"
              bordered={false}
              style={{ borderRadius: 8 }}
              bodyStyle={{ padding: "20px" }}
            >
              <Row align="middle">
                <Col span={8}>
                  <BookOutlined
                    style={{ fontSize: "40px", color: "#52c41a" }}
                  />
                </Col>
                <Col span={16}>
                  <h3>{totalCourses}</h3>
                  <p>85% Increase in 28 Days</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <FacultyList></FacultyList>
      <StudentList></StudentList>
    </div>
  );
};

export default AdminDashboard;
