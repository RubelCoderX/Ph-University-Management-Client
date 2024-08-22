import React from "react";
import { Table, Button, TableColumnsType, Space } from "antd";
import { studentApi } from "../../redux/features/Student/StudentApi";
import { Card, Typography } from "antd";

const { Text } = Typography;

type Section = {
  section: string;
  _id: string;
  days: string;
  startTime: string;
  endTime: string;
};

type CourseData = {
  courseTitle: string;
  academicDepartment: string;
  academicFaculty: string;
  sections: Section[];
};

const StudentOfferedCourse: React.FC = () => {
  const { data: offeredCourseData } =
    studentApi.useGetMyOfferedCourseQuery(undefined);
  const [enrollCourse] = studentApi.useEnrollCoursesMutation();

  // Organize the data by course title
  const singleObject = offeredCourseData?.data?.reduce(
    (acc: Record<string, CourseData>, item) => {
      const key = item.course.title;
      const department = item.academicDepartment.name;
      const faculty = item.academicFaculty.name;
      if (!acc[key]) {
        acc[key] = {
          courseTitle: key,
          academicDepartment: department,
          academicFaculty: faculty,
          sections: [],
        };
      }
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days.join(", "), // Convert array of days to string
        startTime: item.startTime,
        endTime: item.endTime,
      });
      return acc;
    },
    {}
  );

  const modifiedData: CourseData[] = Object.values(singleObject || {});

  // Handle course enrollment
  const handleEnroll = async (id: string) => {
    console.log();
    const enrollData = {
      offeredCourse: id,
    };
    await enrollCourse(enrollData);
  };

  // Define columns for the table
  const columns: TableColumnsType<CourseData> = [
    {
      title: "Course Name",
      dataIndex: "courseTitle",
      key: "courseTitle",
    },
    {
      title: "Academic Department",
      dataIndex: "academicDepartment",
      key: "academicDepartment",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
    },
    {
      title: "Section",
      key: "section",
      render: (_, record: CourseData) => (
        <>
          {record.sections.map((section, index) => (
            <div key={index}>{section.section}</div>
          ))}
        </>
      ),
    },
    {
      title: "Days",
      key: "days",
      render: (_, record: CourseData) => (
        <>
          {record.sections.map((section, index) => (
            <div key={index}>{section.days}</div>
          ))}
        </>
      ),
    },
    {
      title: "Start Time",
      key: "startTime",
      render: (_, record: CourseData) => (
        <>
          {record.sections.map((section, index) => (
            <div key={index}>{section.startTime}</div>
          ))}
        </>
      ),
    },
    {
      title: "End Time",
      key: "endTime",
      render: (_, record: CourseData) => (
        <>
          {record.sections.map((section, index) => (
            <div key={index}>{section.endTime}</div>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: CourseData) => (
        <Space direction="vertical">
          {record.sections.map((section) => (
            <Button
              key={section._id}
              onClick={() => handleEnroll(section._id)}
              style={{ marginBottom: "10px" }}
            >
              Enroll To Course
            </Button>
          ))}
        </Space>
      ),
    },
  ];

  if (!modifiedData.length) {
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
          No available Courses in Here!!
        </Text>
        <div style={{ marginTop: "10px" }}>
          <Text>
            Please check back later or explore our available courses to get
            started!
          </Text>
        </div>
      </Card>
    );
  }
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>My Offered Courses</h2>
      <Table
        columns={columns}
        dataSource={modifiedData}
        rowKey="courseTitle"
        pagination={false}
        bordered
        style={{ marginTop: "30px" }}
      />
    </div>
  );
};

export default StudentOfferedCourse;
