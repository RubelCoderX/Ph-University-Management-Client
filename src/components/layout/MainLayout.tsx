import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { Footer } from "antd/es/layout/layout";
import CustomHeader from "./CustomHeader";
import "./MainLayOut.css";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <SideBar></SideBar>

      <Layout>
        <Header className="header">
          <CustomHeader></CustomHeader>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
