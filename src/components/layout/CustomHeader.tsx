import { Avatar, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { TiUserOutline } from "react-icons/ti";
import "./MainLayOut.css";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { studentApi } from "../../redux/features/Student/StudentApi";
const { Text } = Typography;

const CustomHeader = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  const { data: getProgileData } = studentApi.useGetSingleDataQuery(undefined);
  const profileImg = getProgileData?.data.profileImg;
  return (
    <Flex align="center" justify="space-between">
      <Flex align="center" gap="3rem">
        <Search placeholder="Search Dashboard" allowClear></Search>
        <Flex align="center" gap="10px">
          <Avatar
            src={profileImg}
            icon={!profileImg && <TiUserOutline />}
            size={40}
            shape="circle"
          />
          <IoNotificationsOutline className="header-icon" />
          <LuLogOut onClick={handleLogOut} className="header-icon" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
