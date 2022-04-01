import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: mongoose.Schema.Types.ObjectId,
  body: String,
  sender: String,
  receiver: String,
}, {timestamps: true});


const Message = mongoose.model("message", messageSchema);

export default Message;
