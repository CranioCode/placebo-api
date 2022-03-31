import mongoose from "mongoose";
const arrayLim = (val) => {
  return val.length<=2;
}

const conversationSchema = new mongoose.Schema({
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    validate: [arrayLim,"only two members allowed"],
  }
}, {timestamps: true});


const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;
