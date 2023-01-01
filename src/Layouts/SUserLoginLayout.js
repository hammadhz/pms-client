import { Outlet } from "react-router-dom";

import React from "react";

const SUserLoginLayout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
      <Outlet />
    </div>
  );
};

export default SUserLoginLayout;
