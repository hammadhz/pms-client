import axiosInstance from "../utils/axiosInstance";
import useAuthContext from "./useAuthContext";

const useGet = () => {
  const { dispatch } = useAuthContext();

  const getData = async (url, actionType) => {
    await axiosInstance
      .get(url)
      .then((res) => {
        dispatch({ type: actionType, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { getData };
};

export default useGet;
