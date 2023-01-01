import React, { useEffect, useContext } from "react";
import { SERVER_URL } from "../../constants/ServerUrl";
import axiosInstance from "../../utils/axiosInstance";
import { User } from "../../Context/Context";

const Data = () => {
  const { state, dispatch } = useContext(User);
  const user_id = state.user._id;
  useEffect(() => {
    axiosInstance
      .get(`/spuser/getMedia/${user_id}`)
      .then((res) => {
        dispatch({ type: "GET_MEDIA", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user_id]);
  return (
    <div className="">
      {state.media.map((data) => {
        return (
          <div key={data._id}>
            <div className="flex flex-col">
              <h2 className="text-xl text-[50px] mb-10 text-gray-600">Text</h2>
              <p className="mb-[50px]">{data.text}</p>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl text-[50px] mb-5 text-gray-600">Image</h2>
              <div>
                <div className="flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto">
                  <div className="flex flex-col m-5 ">
                    <div className="relative">
                      <img src={`${SERVER_URL}/${data.media}`} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Data;
