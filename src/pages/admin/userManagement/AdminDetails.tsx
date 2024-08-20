import { useParams } from "react-router-dom";
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import {
  Spin,
  Alert,
  Card,
  Row,
  Col,
  Typography,
  Avatar,
  Tabs,
  Divider,
} from "antd";
import { DateTime, fullName } from "../../../types";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Function to extract and format the date
const formatDate = (datetime: DateTime) => {
  if (!datetime) return datetime;
  const date = new Date(datetime);
  return date.toISOString().split("T")[0];
};
const AdminDetails = () => {
  const { adminId } = useParams();
  const {
    data: adminDetails,
    error,
    isLoading,
  } = userManagementApi.useGetAdminByIdQuery(adminId);
  const admin = adminDetails?.data;

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  // Function to construct full name
  const getFullName = (name: fullName) => {
    if (!name) return "";
    const { firstName, middleName, lastName } = name;
    return `${firstName} ${middleName ? middleName + " " : ""}${lastName}`;
  };
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          marginTop: "30px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error loading faculty details" type="error" />;
  }

  return (
    <Card
      title={
        <span>
          Profile{" "}
          <span style={{ color: "#1777FF" }}>{getFullName(admin?.name)}</span>
        </span>
      }
      extra={<a href="/dashboard">Back to Dashboard</a>}
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              size={128}
              src={admin?.profileImg}
              style={{
                marginBottom: 20,
              }}
            />
            <Title level={2}>{getFullName(admin?.name)}</Title>

            <Text
              style={{
                // textTransform: "uppercase",
                backgroundColor: "#1777FF",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {capitalizeFirstLetter(admin?.user.status)}
            </Text>
            <hr
              style={{
                width: "100%",
                borderColor: "#EEEDEB",
                opacity: 0.5,
                marginTop: "10px",
              }}
            />
            <br />
            <Text
              style={{ fontWeight: "bold" }}
            >{`Admin ID : ${admin?.id}`}</Text>
            <br />

            <hr
              style={{ width: "100%", borderColor: "#EEEDEB", opacity: 0.5 }}
            />
            <Text>{adminDetails.batch}</Text>
            <br />

            <Text>{`Mobile : ${admin?.contactNo}`}</Text>
            <hr
              style={{ width: "100%", borderColor: "#EEEDEB", opacity: 0.5 }}
            />
            <br />
            <Text>{`Email : ${admin?.email}`}</Text>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal" key="1">
              <Card>
                <Title level={4}>Personal Information</Title>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Title: </Text>
                    <Text style={{}}>
                      {capitalizeFirstLetter(admin?.user?.role)}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Blood Group: </Text>
                    <Text>{admin?.bloodGroup}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Gender: </Text>
                    <Text>{capitalizeFirstLetter(admin?.gender)}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Mother Tongue: </Text>
                    <Text>{adminDetails.motherTongue || "-"} </Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Date of Birth: </Text>
                    <Text>{formatDate(admin?.dateOfBirth)}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Present Address: </Text>
                    <Text>{admin?.presentAddress || "-"}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Permanent Address: </Text>
                    <Text>{admin?.permanentAddress || "-"}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Emergency Contact No: </Text>
                    <Text>{admin?.emergencyContactNo}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Religion: </Text>
                    <Text>{adminDetails.religion}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Category: </Text>
                    <Text>{adminDetails.category}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Nationality: </Text>
                    <Text>{adminDetails.nationality}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default AdminDetails;
