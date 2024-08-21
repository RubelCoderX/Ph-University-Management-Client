import { Table } from "antd";
import { studentApi } from "../../redux/features/Student/StudentApi";

const MySchedule = () => {
  const { data: courseSchedule } = studentApi.useGetMyScheduleQuery(undefined);
  console.log(courseSchedule);

  // Transform the data to match the table structure
  const tableData = courseSchedule?.data.map((item) => ({
    key: item._id,
    courseTitle: item.course.title,
    section: item.offeredCourse.section,
    days: item.offeredCourse.days,
    startTime: item.offeredCourse.startTime,
    endTime: item.offeredCourse.endTime,
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
      render: (days: string[]) => days.join(", "), // Join days array into a comma-separated string
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
  ];
  if (!courseSchedule?.data.length) {
    return (
      <p
        style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        No Courses Schedule
      </p>
    );
  }
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false} // Optional: Disable pagination if you don't need it
      bordered
      style={{ marginTop: "30px" }}
    />
  );
};

export default MySchedule;
