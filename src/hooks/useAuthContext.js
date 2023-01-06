import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuthContext;
