import express from "express";
import {
  addmessage,
  getConversationMessages,
} from "../controllers/message.js";

const router = express.Router();

router.get("/:conversationId", getConversationMessages); // finds all messages of a conversation
router.post("/", addmessage); // adds messages to database

export default router;
