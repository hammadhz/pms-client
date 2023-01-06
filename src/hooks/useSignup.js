import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Slide, toast } from "react-toastify";
import { decodeToken } from "react-jwt";
import setSession from "../utils/setSession";

const useSignup = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const signup = async (values) => {
    await axiosInstance
      .post("/user/signup", values)
      .then((res) => {
        toast.success(res.data.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        const accessToken = res.data.token;
        setSession(accessToken);
        const decode = decodeToken(accessToken);
        dispatch({ type: "SIGN_UP", payload: decode });
        setSuccessMsg(true);
        setErrorMsg(false);
        navigate("/user/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
        setSuccessMsg(false);
        setErrorMsg(true);
        navigate("/");
      });
  };

  return { signup, successMsg, errorMsg };
};

export default useSignup;
