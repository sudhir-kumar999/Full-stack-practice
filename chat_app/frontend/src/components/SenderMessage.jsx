import React from "react";
import dp from "../assets/image.png";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SenderMessage = ({ image, message }) => {
  let { userData } = useSelector((state) => state.user);

  let scroll = useRef();
  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  }, [message, image]);
  return (
    <div
      ref={scroll}
      className="flex items-start gap-[10px]"
    >
      
      <div className="w-fit relative  right-0 ml-auto  shadow-gray-400 gap-[10px] flex flex-col shadow-lg h-fit max-w-[500px] bg-[#178eb6] text-white text-[19px] rounded-tr-none rounded-2xl px-[20px] py-[10px]">
      {image && <img src={image} alt="" className="w-[150px] rounded-2xl" />}
      {message && <span>{message}</span>}
      </div>
      <div
        className="w-[40px] h-[40px]   flex justify-center items-center shadow-gray-500 shadow-lg rounded-full cursor-pointer "
        
      >
        <img
          src={userData.image || dp}
          alt=""
          className="rounded-full h-[100%] "
        />
      </div>
    </div>
  );
};

export default SenderMessage;
