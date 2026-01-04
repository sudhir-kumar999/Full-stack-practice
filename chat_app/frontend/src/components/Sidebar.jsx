import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/image.png";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../main";

import {
  setOtherUserData,
  setUserData,
  setSelectedUser,
  setSearchData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
  let { userData, otherUserData, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  let [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  // let { setSelectedUser } = useSelector(state =>state.user);
  const handleLogout = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUserData(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    // e.preventDefault()
    try {
      let result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        {
          withCredentials: true,
        }
      );
      // console.log(result)
      dispatch(setSearchData(result.data));
      // setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (!input) return;

  const timer = setTimeout(() => {
    handleSearch();
  }, 500); // 500ms debounce

  return () => clearTimeout(timer);
}, [input]);

  return (
    <div
      className={`lg:w-[30%] overflow-hidden relative ${
        !selectedUser ? "block" : "hidden"
      } lg:block w-full h-full bg-slate-200`}
    >
      <div
        onClick={handleLogout}
        className="w-[60px] h-[60px] flex justify-center items-center shadow-gray-500 shadow-lg rounded-full bg-[#20c7ff] fixed left-[20px] bottom-[20px]"
      >
        <RiLogoutBoxRLine className="w-[25px] h-[25px] cursor-pointer" />
      </div>

{input.length>0 &&
      <div className="flex items-center   w-full h-[300px] overflow-y-auto flex-col gap-[10px] absolute bg-white top-[300px] z-[150]">
                {searchData?.map((user) => (
                  
                    <div
                      className="w-[95%] h-[70px] bg-white border-b-2  flex justify-start items-center hover:bg-[#a2a2e6]  hover:text-white"
                      onClick={() => dispatch(setSelectedUser(user))}
                    >
                      <div className="relative  mt-[2px] ">
                        <div className="w-[60px] h-[60px] flex justify-center items-center bg-white rounded-full">
                          <img
                            src={user?.image || dp}
                            alt=""
                            className="rounded-full h-[100%] "
                          />
                        </div>
                        {onlineUsers?.includes(user._id) && (
                          <span className="w-[12px] h-[12px] rounded-full absolute bottom-0 right-2 bg-[#11ff11]"></span>
                        )}
                      </div>
                      <h1 className="text-gray-800 font-semibold text-[15px] pl-3">
                        {user.name || user.userName}
                      </h1>
                    </div>
                  
                ))}
              </div>

              }
      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] px-[20px]  shadow-gray-400 shadow-lg flex flex-col justify-center gap-[20px]">
        <h1 className="text-white font-bold text-[25px]">ChatSphere</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-semibold text-[25px]">
            Hii , {userData?.name || "User"}
          </h1>
          <div
            className="w-[60px] h-[60px] flex justify-center items-center shadow-gray-500 shadow-lg rounded-full cursor-pointer "
            onClick={() => navigate("/profile")}
          >
            <img
              src={userData.image || dp}
              alt=""
              className="rounded-full h-[100%] "
            />
          </div>
        </div>
        {/* Search */}
        <div className="w-full flex items-center gap-[20px]">
          {!search && (
            <div
              onClick={() => setSearch(true)}
              className="w-[60px] h-[60px] bg-white flex justify-center items-center shadow-gray-500 shadow-lg rounded-full"
            >
              <IoIosSearch className="w-[25px] h-[25px] cursor-pointer" />
            </div>
          )}
          {search && (
            <form className="w-full h-[60px] flex relative items-center gap-[10px] rounded-full mt-[10px] overflow-hidden px-[20px] bg-white shadow-gray-500 shadow-lg">
              <IoIosSearch className="w-[25px] h-[25px] cursor-pointer" />
              <input
                type="text"
                placeholder="Search Users..."
                className="w-full h-full text-[17px] outline-0 border-0 "
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <RxCross2
                className="w-[25px] h-[25px] cursor-pointer"
                onClick={() => {
    setSearch(false);
    setInput("");
    dispatch(setSearchData([]));
                }}
              />

              
            </form>
          )}
          {!search &&
            otherUserData?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div className="relative  mt-[10px]">
                    <div className="w-[60px] h-[60px] flex justify-center items-center bg-white shadow-gray-500 shadow-lg rounded-full">
                      <img
                        src={user?.image || dp}
                        alt=""
                        className="rounded-full h-[100%] "
                      />
                    </div>
                    <span className="w-[12px] h-[12px] rounded-full absolute bottom-0 right-2 bg-[#11ff11]"></span>
                  </div>
                )
            )}
        </div>
      </div>
      <div className="w-full h-[60vh] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]">
        {otherUserData?.map((user) => (
          <div
            className="w-[95%] h-[60px] bg-white shadow-gray-500 shadow-lg rounded-full flex justify-start items-center hover:bg-[#a2a2e6]  hover:text-white"
            onClick={() => dispatch(setSelectedUser(user))}
          >
            <div className="relative  mt-[2px] ">
              <div className="w-[60px] h-[60px] flex justify-center items-center bg-white shadow-gray-500 shadow-lg rounded-full">
                <img
                  src={user?.image || dp}
                  alt=""
                  className="rounded-full h-[100%] "
                />
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="w-[12px] h-[12px] rounded-full absolute bottom-0 right-2 bg-[#11ff11]"></span>
              )}
            </div>
            <h1 className="text-gray-800 font-semibold text-[15px] pl-3">
              {user.name || user.userName}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
