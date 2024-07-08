import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { authApi } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register } = useForm();

  const defaultValues = {
    id: "A-0001",
    password: "Rubel@8965",
  };

  const [login] = authApi.useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.AccessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.AccessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PhInput type="text" name="id" label="UserId" />

        <PhInput type="password" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
