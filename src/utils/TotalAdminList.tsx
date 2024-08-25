import { Table, Avatar, Row, Col, Spin, Tag } from "antd";
import { userManagementApi } from "../redux/features/Admin/userManagement.api";
import { TAdminData, TFaculty } from "../types";

export type TTableData = Pick<
  TAdminData,
  "id" | "email" | "contactNo" | "name"
>;

const TotalAdminList = () => {
  const {
    data: AdminData,
    isLoading,
    isError,
  } = userManagementApi.useGetAllAdminQuery(undefined);

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
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item: string) => {
        return <Tag>{item}</Tag>;
      },
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

  const tableData = AdminData?.data?.map(
    ({
      _id,
      id,
      email,
      contactNo,
      name,
      user,
      profileImg,

      designation,
      permanentAddress,
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

      designation,
      permanentAddress,
    })
  );

  return (
    <Row justify="center" style={{ marginTop: "30px" }}>
      <Col xs={24}>
        <h2 style={{ marginBottom: "30px" }}>Total Administrator List</h2>
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

export default TotalAdminList;
