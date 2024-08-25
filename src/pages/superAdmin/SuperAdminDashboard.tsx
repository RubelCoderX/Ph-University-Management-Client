import { Card, Col, Row } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { userManagementApi } from "../../redux/features/Admin/userManagement.api";
import TotalAdminList from "../../utils/TotalAdminList";

const SuperAdminDashboard = () => {
  const { data: totalAdmins } =
    userManagementApi.useGetAllAdminQuery(undefined);
  const AllAdmins = totalAdmins?.meta?.total || 0;
  return (
    <div style={{ marginTop: "30px" }}>
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ marginBottom: "30px" }}> Super Administrator Dashboard</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              title="Total Administrator"
              bordered={false}
              style={{ borderRadius: 8, justifyItems: "center" }}
              bodyStyle={{ padding: "20px" }}
            >
              <Row align="middle">
                <Col span={8}>
                  <UserOutlined
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
      <TotalAdminList></TotalAdminList>
    </div>
  );
};

export default SuperAdminDashboard;
