import React, { useEffect } from "react";
import { SERVER_URL } from "../../constants/ServerUrl";
import { useAuthContext, useGet } from "../../hooks";

const Data = () => {
  const { state } = useAuthContext();
  const { getData } = useGet();
  const user_id = state.user._id;
  useEffect(() => {
    getData(`/spuser/getMedia/${user_id}`, "GET_MEDIA");
  }, [user_id]);
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
