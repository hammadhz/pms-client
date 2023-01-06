import axiosInstance from "../utils/axiosInstance";
import { Slide, toast } from "react-toastify";
import useAuthContext from "./useAuthContext";

const usePost = () => {
  const { dispatch } = useAuthContext();
  const postData = async (url, data, actionType) => {
    await axiosInstance
      .post(url, data)
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
        dispatch({ type: actionType, payload: res.data });
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
      });
  };
  return { postData };
};

export default usePost;
