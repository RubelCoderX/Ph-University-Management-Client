import { Avatar, Flex } from "antd";
import Search from "antd/es/input/Search";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { TiUserOutline } from "react-icons/ti";
import "./MainLayOut.css";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { studentApi } from "../../redux/features/Student/StudentApi";
import { verifyToken } from "../../utils/verifyToken";
import { useEffect, useState } from "react";

const CustomHeader = () => {
  const dispatch = useAppDispatch();
  const [profileImg, setProfileImg] = useState("");
  const token = useAppSelector(useCurrentToken);

  const { data: getProfileData } = studentApi.useGetSingleDataQuery(undefined);

  useEffect(() => {
    if (token) {
      const user = verifyToken(token);
      if (user?.role !== "superAdmin") {
        setProfileImg(getProfileData?.data.profileImg);
      }
    }
  }, [token, getProfileData]);

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <Flex align="center" justify="space-between">
      <Flex align="center" gap="3rem">
        <Search placeholder="Search Dashboard" allowClear></Search>
        <Flex align="center" gap="10px">
          {profileImg && (
            <Avatar
              src={profileImg}
              icon={!profileImg && <TiUserOutline />}
              size={40}
              shape="circle"
            />
          )}
          <IoNotificationsOutline className="header-icon" />
          <LuLogOut onClick={handleLogOut} className="header-icon" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
