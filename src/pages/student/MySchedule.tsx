import { Button, Space, Table, Tag } from "antd";
import { studentApi } from "../../redux/features/Student/StudentApi";
import { Link } from "react-router-dom";
import { Card, Typography } from "antd";

const { Text } = Typography;

const MySchedule = () => {
  const { data: courseSchedule } = studentApi.useGetMyScheduleQuery(undefined);
  const { data: courseResult } =
    studentApi.useGetEnrolledCoursesResultQuery(undefined);

  // Create a map of courseId to isCompleted
  const courseCompletedMap = courseResult?.data.reduce((acc, item) => {
    acc[item.course._id] = item.isCompleted;
    return acc;
  }, {});

  // data for table
  const tableData = courseSchedule?.data.map((item) => ({
    key: item._id,
    courseTitle: item.course.title,
    section: item.offeredCourse.section,
    days: item.offeredCourse.days,
    startTime: item.offeredCourse.startTime,
    endTime: item.offeredCourse.endTime,
    courseId: item.course._id,
    isCompleted: courseCompletedMap
      ? courseCompletedMap[item.course._id]
      : false,
  }));

  const columns = [
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      render: (days: string[]) => days.join(" - "),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Status",
      key: "status",
      render: (item: any) => (
        <Tag>
          <span style={{ color: item.isCompleted ? "red" : "black" }}>
            {item.isCompleted ? "Course Completed" : "In-Progress"}
          </span>
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => (
        <Space direction="vertical">
          {item.isCompleted ? (
            <Link to={`/student/result/${item.courseId}`}>
              <Button>Course Result</Button>
            </Link>
          ) : (
            <Button disabled>Course Result</Button>
          )}
        </Space>
      ),
    },
  ];

  if (!courseSchedule?.data.length) {
    return (
      <Card
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          borderColor: "red", // Optional: add a border color for emphasis
        }}
      >
        <Text style={{ color: "red", fontSize: "24px" }}>
          No courses are scheduled at the moment!!
        </Text>
        <div style={{ marginTop: "10px" }}>
          <Text>
            Please check back later or explore our available courses to get
            started
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>My Course Schedule</h2>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false} // Optional: Disable pagination if you don't need it
        bordered
        style={{ marginTop: "30px" }}
      />
    </div>
  );
};

export default MySchedule;
