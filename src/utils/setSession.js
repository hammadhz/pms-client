import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";

const setSession = (accessToken, user) => {
  if (accessToken) {
    Cookies.set("user", JSON.stringify(user));
    Cookies.set("accessToken", accessToken);
    axiosInstance.defaults.headers.common.accessToken = accessToken;
  } else {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    delete axiosInstance.defaults.headers.common.accessToken;
  }
};

export default setSession;
