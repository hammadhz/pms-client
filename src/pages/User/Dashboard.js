import React from "react";
import { useAuthContext } from "../../hooks";

const Dashboard = () => {
  const { state } = useAuthContext();
  return (
    <div className="flex justify-around items-center">
      <i className="">Hello {state.user.name}</i>
    </div>
  );
};

export default Dashboard;
