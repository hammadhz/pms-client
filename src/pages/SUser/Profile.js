import React, { useState, useContext } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { User } from "../../Context/Context";
import { Slide, ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [about, setAbout] = useState({
    about: "",
  });
  const [profile, setProfile] = useState("");
  const { state, dispatch } = useContext(User);
  const user_id = state.user._id;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };
  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("about", about.about);
    formData.append("profile", profile);
    formData.append("user_id", user_id);
    axiosInstance
      .post("/spuser/profile", formData)
      .then((res) => {
        dispatch({ type: "ADD_PROFILE", payload: res.data });
        toast.success(res.data, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
    setAbout({
      about: "",
    });
    setProfile("");
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              // encType="multipart/form-data"
            >
              <div>
                <label
                  htmlFor="About"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  About
                </label>
                <textarea
                  type="text"
                  name="about"
                  placeholder="About"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  maxLength={500}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="profile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Profile
                </label>
                <input
                  type="file"
                  name="profile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={handleFileChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;