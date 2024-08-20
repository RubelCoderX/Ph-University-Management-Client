import { useParams } from "react-router-dom";
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
import { userManagementApi } from "../../../redux/features/Admin/userManagement.api";
import { DateTime, fullName } from "../../../types";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Function to extract and format the date
const formatDate = (datetime: DateTime) => {
  if (!datetime) return datetime;
  const date = new Date(datetime);
  return date.toISOString().split("T")[0];
};
const FacultiesDetails = () => {
  const { facultyId } = useParams();
  const {
    data: facultyDetails,
    error,
    isLoading,
  } = userManagementApi.useGetFacultyByIdQuery(facultyId);
  const faculty = facultyDetails?.data;

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
          <span style={{ color: "#1777FF" }}>{getFullName(faculty?.name)}</span>
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
              src={faculty?.profileImg}
              style={{
                marginBottom: 20,
              }}
            />
            <Title level={2}>{getFullName(faculty?.name)}</Title>

            <Text
              style={{
                // textTransform: "uppercase",
                backgroundColor: "#1777FF",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {capitalizeFirstLetter(faculty?.user.status)}
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
            <Text style={{ fontWeight: "bold" }}>{` ${faculty?.id}`}</Text>
            <br />
            <Text>{`Semester - ${faculty?.semester}`}</Text>
            <hr
              style={{ width: "100%", borderColor: "#EEEDEB", opacity: 0.5 }}
            />
            <Text>{facultyDetails.batch}</Text>
            <br />

            <Text>{`Mobile : ${faculty?.contactNo}`}</Text>
            <hr
              style={{ width: "100%", borderColor: "#EEEDEB", opacity: 0.5 }}
            />
            <br />
            <Text>{`Email : ${faculty?.email}`}</Text>
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
                      {capitalizeFirstLetter(faculty?.user?.role)}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Blood Group: </Text>
                    <Text>{faculty?.bloodGroup}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Gender: </Text>
                    <Text>{capitalizeFirstLetter(faculty?.gender)}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Mother Tongue: </Text>
                    <Text>{facultyDetails.motherTongue || "-"} </Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Date of Birth: </Text>
                    <Text>{formatDate(faculty?.dateOfBirth)}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Present Address: </Text>
                    <Text>{faculty?.presentAddress || "-"}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Permanent Address: </Text>
                    <Text>{faculty?.permanentAddress || "-"}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Emergency Contact No: </Text>
                    <Text>{faculty?.emergencyContactNo}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Religion: </Text>
                    <Text>{facultyDetails.religion}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Category: </Text>
                    <Text>{facultyDetails.category}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Nationality: </Text>
                    <Text>{facultyDetails.nationality}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>

            <TabPane tab="Academic Department" key="2">
              <Card>
                <Title level={4}>Department Information</Title>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Name : </Text>
                    <Text>{faculty?.academicDepartment?.name}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Academic Faculty" key="3">
              <Card>
                <Title level={4}>Faculty Information</Title>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Name : </Text>
                    <Text>
                      {faculty?.academicDepartment?.academicFaculty?.name}
                    </Text>
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

export default FacultiesDetails;
