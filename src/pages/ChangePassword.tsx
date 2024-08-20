import { Button, Col, Row } from "antd";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
import avatarImg from "../assets/images/graduated.png";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { userManagementApi } from "../redux/features/Admin/userManagement.api";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { logOut } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = userManagementApi.useAddChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await changePassword(data);
      if (res.data.success) {
        // toast.success("Password changed successfully!", {
        //   duration: 2000,
        //   position: "top-center",
        // });

        // Wait a bit to show the success message

        dispatch(logOut());
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Password change failed", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: "100vh", background: "#f0f2f5" }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={avatarImg}
            alt="Avatar"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ marginBottom: "10px" }}>
            Welcome to FutureAcademy University
          </h1>
        </div>
        <PhForm onSubmit={onSubmit}>
          <PhInput
            type="password"
            name="oldPassword"
            label="Type Old Password"
          />
          <PhInput
            type="password"
            name="newPassword"
            label="Type New Password"
          />
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <a href="#" style={{ color: "#1890ff" }}>
              Forgot Password / User ID
            </a>
          </div>
          <Button type="primary" htmlType="submit" block>
            Change Password
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default ChangePassword;
