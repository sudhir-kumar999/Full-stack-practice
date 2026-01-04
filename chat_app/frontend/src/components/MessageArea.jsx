import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "../assets/image.png";
import EmojiPicker from "emoji-picker-react";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice";
import { useEffect } from "react";
// import { Socket } from "socket.io-client";

const MessageArea = () => {
  const [picker, setPicker] = useState(false);
  let [frontImage, setFrontImage] = useState("");
  let [backImage, setBackImage] = useState("");
  let { userData } = useSelector((state) => state.user);
  let { messages } = useSelector((state) => state.message);

  let { selectedUser, socket } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  let [input, setInput] = useState("");
  let image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackImage(file);
    setFrontImage(URL.createObjectURL(file));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length == 0) {
      return null;
    }
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backImage) {
        formData.append("image", backImage);
      }
      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser?._id}`,
        formData,
        { withCredentials: true }
      );
      // console.log(result.data)
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontImage(null);
      setBackImage(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setPicker(false);
  };
  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });
    return () => socket.off("newMessage");
  }, [messages, setMessages]);

  return (
    <div
      className={`lg:w-[70%] relative ${
        selectedUser ? "flex" : "hidden"
      } lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}
    >
      {selectedUser && (
        <div className="w-full h-[100vh] flex flex-col">
          <div className="w-full h-[100px] bg-[#1480a4] rounded-b-[30px] px-[20px] gap-[20px] shadow-gray-400 shadow-lg flex  items-center gap-[20px]">
            <div
              className=" cursor-pointer"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <IoMdArrowRoundBack className="w-[25px] h-[25px] text-white" />
            </div>
            <div className="w-[50px] h-[50px] flex justify-center items-center shadow-gray-500 shadow-lg rounded-full cursor-pointer ">
              <img
                src={selectedUser?.image}
                alt=""
                className="rounded-full h-[100%] "
              />
            </div>
            <h1 className="font-semibold text-[15px] text-white">
              {selectedUser?.name || "user"}
            </h1>
          </div>

          <div className="w-full h-[75vh]  flex flex-col py-[50px] px-[20px] overflow-auto gap-[20px]">
            {picker && (
              <div className="absolute bottom-[120px] left-[20px]">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={250}
                  height={350}
                  className="shadow-lg z-100"
                />
              </div>
            )}
            {/* <SenderMessage/>
          <ReceiverMessage/> */}

            {messages &&
              messages.map((mess) =>
                mess.sender == userData._id ? (
                  <SenderMessage image={mess.image} message={mess.message} />
                ) : (
                  <ReceiverMessage image={mess.image} message={mess.message} />
                )
              )}
          </div>
        </div>
      )}
      {!selectedUser && (
        <div className="w-full h-full flex justify-center items-center flex-col">
          <h1 className="font-bold text-[50px] text-gray-700">
            Welcome to ChatSphere
          </h1>
          <span className="font-semibold text-[30px] text-gray-700">
            Chat with friends
          </span>
        </div>
      )}

      {selectedUser && (
        <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center ">
          <img
            src={frontImage}
            alt=""
            className="absolute w-[80px] absolute bottom-[100px] right-[20%] rounded-lg  shadow-gray-400 shadow-lg"
          />

          <form
            onSubmit={handleSendMessage}
            className=" flex px-[20px] items-center gap-[20px] w-[95%] lg:w-[70%] h-[60px] bg-[#1797c2] shadow-gray-400 shadow-lg rounded-full"
          >
            <div onClick={() => setPicker((prev) => !prev)}>
              <RiEmojiStickerLine className="w-[25px] h-[25px] cursor-pointer text-white" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />

            <input
              type="text"
              className="w-full h-full placeholder-white text-white outline-none"
              placeholder="Type messages"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div onClick={() => image.current.click()}>
              <FaImages className="w-[25px] h-[25px] cursor-pointer text-white" />
            </div>
            <button>
              <IoSend className="w-[25px] h-[25px] cursor-pointer text-white" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MessageArea;
