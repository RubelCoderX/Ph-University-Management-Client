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
const StudentDetails = () => {
  const { studentId } = useParams();
  const {
    data: studentDetails,
    error,
    isLoading,
  } = userManagementApi.useGetStudentByIdQuery(studentId);
  const student = studentDetails?.data;

  const capitalizeFirstLetter = (string: string): string => {
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
          <span style={{ color: "#1777FF" }}>{getFullName(student?.name)}</span>
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
              size={180}
              src={student?.profileImg}
              style={{
                marginBottom: 20,
              }}
            />
            <Title level={2}>{getFullName(student?.name)}</Title>

            <Text
              style={{
                // textTransform: "uppercase",
                backgroundColor: "#1777FF",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {capitalizeFirstLetter(student?.user.status)}
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
            <Text style={{ fontWeight: "bold" }}>{` ${student?.id}`}</Text>
            <br />
            <Text>{`Semester - ${student?.semester}`}</Text>
            <hr
              style={{ width: "100%", borderColor: "#EEEDEB", opacity: 0.5 }}
            />
            <Text>{studentDetails.batch}</Text>
            <br />

            <Text>{`Mobile : ${student?.contactNo}`}</Text>
            <hr
              style={{ width: "100%", borderColor: "#EEEDEB", opacity: 0.5 }}
            />
            <br />
            <Text>{`Email : ${student?.email}`}</Text>
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
                      {capitalizeFirstLetter(student?.user?.role)}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Blood Group: </Text>
                    <Text>{student?.bloodGroup}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Gender: </Text>
                    <Text>{capitalizeFirstLetter(student?.gender)}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Mother Tongue: </Text>
                    <Text>{studentDetails.motherTongue || "-"} </Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Date of Birth: </Text>
                    <Text>{formatDate(student?.dateOfBirth)}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Present Address: </Text>
                    <Text>{student?.presentAddress || "-"}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Permanent Address: </Text>
                    <Text>{student?.permanentAddress || "-"}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Emergency Contact No: </Text>
                    <Text>{student?.emergencyContactNo}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Religion: </Text>
                    <Text>{studentDetails.religion}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Category: </Text>
                    <Text>{studentDetails.category}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Nationality: </Text>
                    <Text>{studentDetails.nationality}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Parents" key="2">
              <Card>
                <Title level={4}>Parents Information</Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Father Name : </Text>
                    <Text>{student?.guardian?.fatherName}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Father Contact No : </Text>
                    <Text>{student?.guardian?.fatherContactNo}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Father Occupation : </Text>
                    <Text>{student?.guardian?.fatherOccupation}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Mother Name: </Text>
                    <Text>{student?.guardian?.motherName}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Mother Occupation : </Text>
                    <Text>{student?.guardian?.motherOccupation}</Text>
                  </Col>

                  <Col span={12}>
                    <Text strong>Mother Contact No : </Text>
                    <Text>{student?.guardian?.motherContactNo}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Local Parents" key="3">
              <Card>
                <Title level={4}>Local Parents Information</Title>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Name : </Text>
                    <Text>{student?.localGuardian?.name}</Text>
                  </Col>

                  <Col span={12}>
                    <Text strong>Occupation : </Text>
                    <Text>{student?.localGuardian?.occupation}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Contact No : </Text>
                    <Text>{student?.localGuardian?.contactNo}</Text>
                  </Col>

                  <Col span={12}>
                    <Text strong>Address : </Text>
                    <Text>{student?.localGuardian?.address}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Admission" key="4">
              <Card>
                <Title level={4}>Admission Information</Title>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Name : </Text>
                    <Text>{student?.admissionSemester?.name}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>Start Month : </Text>
                    <Text>{student?.admissionSemester?.startMonth}</Text>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Year : </Text>
                    <Text>{student?.admissionSemester?.year}</Text>
                  </Col>
                  <Col span={12}>
                    <Text strong>End Month : </Text>
                    <Text>{student?.admissionSemester?.endMonth}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Department" key="5">
              <Card>
                <Title level={4}>Department Information</Title>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Name : </Text>
                    <Text>{student?.academicDepartment?.name}</Text>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="Faculty" key="6">
              <Card>
                <Title level={4}>Faculty Information</Title>
                <Divider></Divider>
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong>Name : </Text>
                    <Text>{student?.academicFaculty?.name}</Text>
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

export default StudentDetails;
