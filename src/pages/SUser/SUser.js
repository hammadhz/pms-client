import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAuthContext, usePost, useGet } from "../../hooks";

const SUser = () => {
  const [text, setText] = useState({
    text: "",
  });
  const [media, setMedia] = useState("");

  const { state } = useAuthContext();
  const { postData } = usePost();
  const { getData } = useGet();
  const user_id = state.user._id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };
  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", text.text);
    formData.append("media", media);
    formData.append("user_id", user_id);
    await postData("/spuser/media", formData, "ADD_MEDIA");
    setText({
      text: "",
    });
    setMedia("");
  };

  useEffect(() => {
    getData(`/spuser/profile/${user_id}`, "GET_PROFILE");
  }, [user_id]);
  return (
    <div>
      <div>
        {state.profile.map((data) => {
          return (
            <div className="flex flex-col gap-10" key={data._id}>
              <h2 className="text-lg text-[50px] text-gray-600">About</h2>
              <div className="max-w-[900px] text-md text-[20px] mb-6">
                {data.about}
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <textarea
              className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlTextarea1"
              rows="2"
              placeholder="Write Text"
              maxLength="500"
              name="text"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="file"
              name="media"
              className="block py-2.5 px-0 w-full text-sm text-blue-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              onChange={handleMediaChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Media
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SUser;
