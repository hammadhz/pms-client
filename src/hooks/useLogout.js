import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";
import setSession from "../utils/setSession";

const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const logout = (path) => {
    dispatch({ type: "LOGOUT" });
    setSession();
    navigate(path);
  };
  return { logout };
};

export default useLogout;
