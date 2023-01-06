import { useNavigate } from "react-router-dom";
import setSession from "../utils/setSession";
import useAuthContext from "./useAuthContext";
import { Slide, toast } from "react-toastify";
import { decodeToken } from "react-jwt";
import axiosInstance from "../utils/axiosInstance";

const useSignin = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const signin = async (values) => {
    await axiosInstance
      .post("/user/signin", values)
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
        dispatch({ type: "SIGN_IN", payload: decode });
        if (res.data.user.role === "normal user") {
          navigate("/user/dashboard");
        }
        if (res.data.user.role === "special user") {
          navigate("/spuser/dashboard");
        }
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
        navigate("/signin");
      });
  };
  return { signin };
};

export default useSignin;
