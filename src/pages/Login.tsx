import { Button, Row, Col } from "antd";
import { FieldValues } from "react-hook-form";
import { authApi } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

import avatarImg from "../assets/images/graduated.png"; // Replace with your avatar image if needed

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const defaultValues = {
  //   id: "A-0001",
  //   password: "admin@123",
  // };

  const [login] = authApi.useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.AccessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.AccessToken }));
      toast.success("Logged in", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
      if (res.data.needsPasswordChage) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toastId,
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
          <PhInput type="text" name="id" label="User ID" />
          <PhInput type="password" name="password" label="Password" />
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <a href="#" style={{ color: "#1890ff" }}>
              Forgot Password / User ID
            </a>
          </div>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default Login;
