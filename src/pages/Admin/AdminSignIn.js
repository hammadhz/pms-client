import React, { useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../Context/Context";
import setSession from "../../utils/setSession";
import { decodeToken } from "react-jwt";

const AdminSignIn = () => {
  const [adminSignIn, setAdminSignIn] = useState({
    name: "",
    password: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { dispatch } = useContext(User);

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminSignIn({ ...adminSignIn, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/admin/signin", adminSignIn)
      .then((res) => {
        setErrorMsg("");
        setSuccessMsg(res.data);
        const user = res.data.user;
        const accessToken = res.data.token;
        setSession(accessToken, user);
        const myDecode = decodeToken(accessToken);
        dispatch({ type: "GET_CURRENT_USER", payload: myDecode });
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
        setSuccessMsg("");
        navigate("/admin/signin");
      });
    setAdminSignIn({
      email: "",
      password: "",
    });
  };
  return (
    <React.Fragment>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone lock"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <input
                    name="name"
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>
              </form>
              {errorMsg && (
                <div
                  className="bg-red-100 rounded-lg py-5 px-6 my-4 text-base text-red-700"
                  role="alert"
                >
                  <FontAwesomeIcon icon={faCircleXmark} /> {errorMsg}
                </div>
              )}
              {successMsg && (
                <div
                  className="bg-green-100 rounded-lg py-5 px-6 my-4 text-base text-green-700"
                  role="alert"
                >
                  <FontAwesomeIcon icon={faCircleCheck} /> {successMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AdminSignIn;
