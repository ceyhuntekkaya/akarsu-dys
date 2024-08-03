/* eslint-disable no-unused-vars */
import { jwtDecode } from "jwt-decode";
import { parseJwt } from "./TokenUtilization";

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  var decoded = jwtDecode.decode(user?.accessToken);
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  var decoded = jwtDecode.decode(user?.accessToken);
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = (user) => {
  return parseJwt(user?.access_token);
};

const setUser = (user) => {
  const userData = parseJwt(user?.access_token);
  localStorage.setItem("userRole", userData.role);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("userId", userData.user_id);
  localStorage.setItem("schoolId", user.schoolId);
};

const removeUser = () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("parent_data");
  localStorage.removeItem("staff_data");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("loginCodeLastTime");
  localStorage.removeItem("login_code");
  localStorage.removeItem("phone");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
