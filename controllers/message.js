import { Message } from "../models/Message.js";

/**
 * @description finds all the messages of a perticular conversation
 */

const getConversationMessages = async (req, res) => {
  try {
    const messages = await Message.findByConversationId(
      req.params.conversationId
    );
    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.json(error);
  }
};

/**
 * @description adds new to message to firestore
 * note:: req body contains an object of message.
 */

const addmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { conversationId, body, sender, receiver } = message;
    const newMessage = new Message(conversationId, body, sender, receiver);
    const savedDoc = await newMessage.save();
    res.json({
      success: true,
      data: savedDoc,
    });
  } catch (error) {
    res.json(error);
  }
};

export { getConversationMessages, addmessage };
