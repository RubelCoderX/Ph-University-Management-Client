import { Avatar, Flex } from "antd";
import Search from "antd/es/input/Search";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { TiUserOutline } from "react-icons/ti";
import "./MainLayOut.css";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const CustomHeader = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <Flex align="center" justify="space-between">
      <Flex align="center" gap="3rem">
        <Search placeholder="Search Dashboard" allowClear></Search>
        <Flex align="center" gap="10px">
          <IoNotificationsOutline className="header-icon" />

          <Avatar icon={<TiUserOutline />} />
          <LuLogOut onClick={handleLogOut} className="header-icon" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
