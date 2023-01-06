import React from "react";
import {
  AdminLoginLayout,
  AdminLayout,
  NavBar,
  SUserLayout,
  UserLayout,
} from "../Layouts";
import { AdminSignIn, AddUser, Users } from "../pages/Admin";
import { Dashboard } from "../pages/User";
import { SUser, Data, Profile } from "../pages/SUser";
import { SignIn, SignUp } from "../pages/Auth";
import { Navigate } from "react-router-dom";

const routes = (user) => [
  {
    element: <AdminLoginLayout />,
    children: [{ path: "/admin/signin", element: <AdminSignIn /> }],
  },
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin/dashboard", element: <Users /> },
      { path: "/admin/dashboard/addUser", element: <AddUser /> },
    ],
  },
  {
    element: <NavBar />,
    children: [
      { path: "/", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
  {
    element: user ? <SUserLayout /> : <Navigate to="/signin" />,
    children: [
      { path: "/spuser/dashboard", element: <SUser /> },
      { path: "/spuser/dashboard/media", element: <Data /> },
      { path: "/spuser/dashboard/profile", element: <Profile /> },
    ],
  },
  {
    element: user ? <UserLayout /> : <Navigate to="/signin" />,
    children: [{ path: "/user/dashboard", element: <Dashboard /> }],
  },
];

export default routes;
