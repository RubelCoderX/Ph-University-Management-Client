import { Table, Avatar, Row, Col, Spin, Tag } from "antd";
import { userManagementApi } from "../redux/features/Admin/userManagement.api";
import { TStudent } from "../types";

export type TTableData = Pick<
  TStudent,
  "id" | "email" | "contactNo" | "name" | "academicDepartment"
>;

const StudentList = () => {
  const {
    data: studentData,
    isLoading,
    isError,
  } = userManagementApi.useGetAllStudentQuery([
    {
      name: "sort",
      value: "id",
    },
  ]);
  const columns = [
    {
      title: "Profile Image",
      dataIndex: "profileImg",
      key: "profileImg",
      render: (_: any, record: any) => (
        <span>
          <Avatar src={record.profileImg} /> {record.fullName}
        </span>
      ),
    },

    {
      title: "Enrollment No",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item: string) => {
        return <Tag>{item}</Tag>;
      },
    },
    {
      title: "Address",
      dataIndex: "presentAddress",
      key: "presentAddress",
    },
  ];

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  if (isError)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Error loading data
      </div>
    );

  const tableData = studentData?.data?.map(
    ({
      _id,
      name,
      id,
      email,
      contactNo,
      user,
      profileImg,
      presentAddress,
    }) => ({
      key: _id,
      userId: user?._id,
      fullName: `${name.firstName} ${
        name.middleName ? name.middleName + " " : ""
      }${name.lastName}`,
      id,
      email,
      contactNo,
      status: user?.status,
      profileImg,
      presentAddress,
    })
  );

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24}>
        <h2 style={{ marginBottom: "30px" }}>Student List</h2>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ x: 800 }} // Adjust width as necessary for horizontal scrolling
          style={{ overflowX: "auto" }}
        />
      </Col>
    </Row>
  );
};

export default StudentList;
