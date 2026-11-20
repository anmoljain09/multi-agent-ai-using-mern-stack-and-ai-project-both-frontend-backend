import express from "express";

import authMiddleware from "../../../gateway/authMiddleware.js";

import { createConversation, getConversations, getConversation, updateConversation, deleteConversation, sendMessage, } from "../controller/chatController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/conversation", createConversation);

router.get("/conversation", getConversations);

router.get("/conversation/:id", getConversation);

router.put("/conversation/:id", updateConversation);

router.delete("/conversation/:id", deleteConversation);

router.post("/message", sendMessage);

export default router;