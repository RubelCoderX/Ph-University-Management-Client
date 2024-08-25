import { Card, Col, Row, Table } from "antd";
import { facultyApi } from "../../redux/features/faculty/facultyApi";
import { BookOutlined } from "@ant-design/icons";

const FacultyDashboard = () => {
  const { data: facultyCourses } =
    facultyApi.useGetAllFacultyCourseQuery(undefined);

  const tableData = facultyCourses?.data?.map((item) => {
    return {
      key: item._id,
      courseTitle: item.course.title,
      courseCode: item.course.code,
      semester: item.academicSemester.name,
      year: item.academicSemester.year,
      department: item.academicDepartment.name,
      facultyName: `${item.faculty.name.firstName} ${
        item.faculty.name.middleName ? item.faculty.name.middleName + " " : ""
      }${item.faculty.name.lastName}`,
      academicFaculty: item.academicFaculty?.name,
    };
  });

  // Define the columns for the table
  const columns = [
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
    },
    {
      title: "Course Code",
      dataIndex: "courseCode",
      key: "courseCode",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
    },
    {
      title: "Faculty Name",
      dataIndex: "facultyName",
      key: "facultyName",
    },
  ];
  const AllAdmins = facultyCourses?.meta?.total || 0;
  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "30px" }}> Faculty Dashboard</h2>
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
                  <BookOutlined
                    style={{ fontSize: "40px", color: "#1890ff" }}
                  />
                </Col>
                <Col span={16}>
                  <h3>{AllAdmins}</h3>
                  <p>45% Increase in 28 Days</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "30px" }}>Total Courses List</h2>
        <Table
          columns={columns}
          dataSource={tableData || []}
          rowKey={(record) => record.key}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </>
  );
};

export default FacultyDashboard;
