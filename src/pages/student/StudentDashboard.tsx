import { Card, Col, Row } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { studentApi } from "../../redux/features/Student/StudentApi";

const SuperAdminDashboard = () => {
  const { data: offeredCourse } =
    studentApi.useGetMyOfferedCourseQuery(undefined);

  // Calculate the total number of courses
  const totalCourses = offeredCourse?.data?.length || 0;

  return (
    <div style={{ marginTop: "30px" }}>
      <h2 style={{ marginBottom: "30px" }}>Student Dashboard</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Total Courses"
            bordered={false}
            style={{ borderRadius: 8, justifyItems: "center" }}
            bodyStyle={{ padding: "20px" }}
          >
            <Row align="middle">
              <Col span={8}>
                <BookOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              </Col>
              <Col span={16}>
                <h3>{totalCourses} Offered Courses</h3>
                <p>45% Increase in 28 Days</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SuperAdminDashboard;
