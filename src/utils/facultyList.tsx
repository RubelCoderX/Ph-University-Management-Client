import { Table, Avatar, Row, Col, Spin } from "antd";
import { userManagementApi } from "../redux/features/Admin/userManagement.api";
import { TFaculty } from "../types";

export type TTableData = Pick<
  TFaculty,
  "id" | "email" | "contactNo" | "name" | "academicDepartment"
>;

const FacultyList = () => {
  const {
    data: facultyData,
    isLoading,
    isError,
  } = userManagementApi.useGetAllFacultiesQuery(undefined);

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
      title: "Department",
      dataIndex: "academicDepartment",
      key: "academicDepartment",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      key: "academicFaculty",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
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
      title: "Address",
      dataIndex: "permanentAddress",
      key: "permanentAddress",
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

  const tableData = facultyData?.data?.map(
    ({
      _id,
      id,
      email,
      contactNo,
      name,
      user,
      profileImg,
      academicDepartment,
      designation,
      permanentAddress,
      academicFaculty,
    }) => ({
      key: _id,
      userId: user?._id,
      id,
      fullName: `${name.firstName} ${
        name.middleName ? name.middleName + " " : ""
      }${name.lastName}`,
      email,
      contactNo,
      status: user?.status,
      profileImg,
      academicDepartment: academicDepartment?.name,
      designation,
      permanentAddress,
      academicFaculty: academicFaculty?.name,
    })
  );

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24}>
        <h2 style={{ marginBottom: "30px" }}>Teachers List</h2>
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

export default FacultyList;
