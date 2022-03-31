import express from "express";
import { addConversation, getConversationByUserId , removeUser} from "../controllers/conversation.js";

const router =  express.Router({ mergeParams: true})

router.get("/:userId", getConversationByUserId);
router.post("/", addConversation);
router.patch("/:conversationId/:userId", removeUser); // removes user from specific converstion

export default router;
