import { Outlet } from "react-router-dom";

const AdminLoginLayout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
      <Outlet />
    </div>
  );
};

export default AdminLoginLayout;
