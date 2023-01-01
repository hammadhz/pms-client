import React from "react";
import {
  AdminLoginLayout,
  AdminLayout,
  NavBar,
  SUserLayout,
  SUserLoginLayout,
  UserLayout,
} from "../Layouts";
import { AdminSignIn, AddUser, Users } from "../pages/Admin";
import { SignUp, SignIn, Dashboard } from "../pages/User";
import { SUser, Data, Login, Profile } from "../pages/SUser";

let routes = [
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
    element: <SUserLayout />,
    children: [
      { path: "/spuser/dashboard", element: <SUser /> },
      { path: "/spuser/dashboard/media", element: <Data /> },
      { path: "/spuser/dashboard/profile", element: <Profile /> },
    ],
  },
  {
    element: <SUserLoginLayout />,
    children: [{ path: "/spuser/login", element: <Login /> }],
  },
  {
    element: <UserLayout />,
    children: [{ path: "/user/dashboard", element: <Dashboard /> }],
  },
];

export default routes;
