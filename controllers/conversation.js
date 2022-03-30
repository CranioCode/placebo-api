import Conversation from "../models/conversation.js";

/**
 * @description finds all conversation of the user and sends to client
 */

const getConversationByUserId = async (req, res) => {
  try {
    const conversations = await Conversation.find({members: {"$in" : [req?.params?.userId]}})
    res.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @description adds new Conversation on request.
 * note:: request body contains an array members only.
 */
const addConversation = async (req, res) => {
  try {
    const { members } = req.body;
    const [user1, user2] = members;
    
    const newConversation = new Conversation({
      members: [user1,user2],
    })

    await newConversation.save();

    res.json({
      success: true,
      data: newConversation,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @description removes user from specific conversation
 */
const removeUser = async (req, res) => {
  try {
    const { conversationId, userId } = req.params;
      const conversation = await Conversation.findById(conversationId);
    const newMembers = conversation.members.map((user) =>
      user === userId ? null : user
    );

    await Conversation.findByIdAndUpdate(conversationId, {members: newMembers});
    res.json({
      success: true,
      data: "user removed from conversation",
    });
  } catch (error) {
    res.json({
      success: false,
      error: "failed to remove user",
    });
  }
};

export {
  getConversationByUserId,
  addConversation,
  removeUser,
}
