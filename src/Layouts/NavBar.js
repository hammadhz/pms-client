import React from "react";
import { Link, Outlet } from "react-router-dom";

const NavBar = ({ children }) => {
  return (
    <React.Fragment>
      <>
        <div className="h-[55px] w-full bg-sixth py-[16px]">
          <div className="container">
            <nav className="flex justify-center gap-8 mb-[40px]">
              <Link
                to="/"
                className="font-bold font-open text-slate-700 rounded-lg hover:text-slate-900"
              >
                Sign up
              </Link>
              <Link
                to="/signin"
                className="font-bold font-open text-slate-700 rounded-lg hover:text-slate-900"
              >
                Sign in
              </Link>
            </nav>
          </div>
        </div>
        {children}
      </>
      <Outlet />
    </React.Fragment>
  );
};

export default NavBar;
