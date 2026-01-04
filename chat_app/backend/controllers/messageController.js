import uploadCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let { message } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error:${error}`,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let { receiver } = req.params;
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) {
      res.status(400).json({
        message: "conversation is not found",
      });
    }
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `get message error:${error}`,
    });
  }
};
