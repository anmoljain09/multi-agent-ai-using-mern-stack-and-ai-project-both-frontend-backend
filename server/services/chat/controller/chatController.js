/*

user: req.user.id, // auth middleware se

*/

import { askAgent } from "../services/agentService.js";
import conversationModel from "../model/conversationModel.js";
import messageModel from "../model/messageModel.js";
import mongoose from "mongoose";

// Create Conversation
export const createConversation = async (req, res) => {

    try {

        const { title } = req.body;

        const conversation = await conversationModel.create({
            user: req.user.id,
            title: title || "New Chat",
        });

        res.status(201).send({ success: true, conversation });

    }

    catch (error) {

        res.status(500).send({ success: false, message: error.message });

    }

};


// Get All Conversations
export const getConversations = async (req, res) => {

    try {

        const conversations = await conversationModel
            .find({ user: req.user.id })
            .populate("lastMessage")
            .sort({ updatedAt: -1 });

        res.status(200).send({ success: true, conversations });

    }

    catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};


// Get Single Conversation
export const getConversation = async (req, res) => {

    try {

        const { id } = req.params;

        const conversation = await conversationModel.findOne({
            _id: id,
            user: req.user.id,
        });

        if (!conversation)
            return res.status(404).send({ success: false, message: "Conversation not found" });

        const messages = await messageModel
            .find({ conversation: id })
            .sort({ createdAt: 1 });

        res.status(200).json({ success: true, conversation, messages });

    }

    catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};


// Update Conversation Title
export const updateConversation = async (req, res) => {

    try {

        const { title } = req.body;

        const conversation = await conversationModel.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title },
            { new: true }
        );

        if (!conversation)
            return res.status(404).json({ success: false, message: "Conversation not found" });

        res.status(200).json({ success: true, conversation });

    }

    catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};


// Delete Conversation
export const deleteConversation = async (req, res) => {

    try {

        const conversation = await conversationModel.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!conversation)
            return res.status(404).json({ success: false, message: "Conversation not found" });

        await messageModel.deleteMany({ conversation: conversation._id });
        await conversation.deleteOne();

        res.status(200).json({ success: true, message: "Conversation deleted" });

    }

    catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};


// Add Message
export const createAndSaveMessage = async (req, res) => {

    try {

        const { conversationId, role, content } = req.body;

        const conversation = await conversationModel.findOne({
            _id: conversationId,
            user: req.user.id,
        });

        if (!conversation)
            return res.status(404).json({ success: false, message: "Conversation not found" });

        const message = await messageModel.create({
            conversation: conversationId,
            role,
            content,
        });

        conversation.lastMessage = message._id;

        if (conversation.title === "New Chat") {
            conversation.title = content.length > 30 ? content.slice(0, 30) + "..." : content;
        }

        await conversation.save();

        res.status(201).json({ success: true, message });

    }

    catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};


// Update Message
export const updateMessage = async (req, res) => {

    try {

        const { content } = req.body;

        const message = await messageModel.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
        );

        if (!message)
            return res.status(404).json({ success: false, message: "Message not found" });

        res.status(200).json({ success: true, message });

    }

    catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};


// Delete Message
export const deleteMessage = async (req, res) => {

    try {

        const message = await messageModel.findById(req.params.id);

        if (!message)
            return res.status(404).json({ success: false, message: "Message not found" });

        await message.deleteOne();

        res.status(200).json({ success: true, message: "Message deleted" });

    }

    catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }

};


// Send Message
export const sendMessage = async (req, res) => {

    try {

        const { conversationId, content } = req.body;

        const conversation = await conversationModel.findOne({
            _id: conversationId,
            user: req.user.id,
        });

        if (!conversation)
            return res.status(404).json({ success: false, message: "Conversation not found" });

        // Save User Message

        const userMessage = await messageModel.create({
            conversation: conversationId,
            role: "user",
            content,
        });

        // Ask AI

        const answer = await askAgent(content);

        console.log(answer);


        // Save Assistant Message

        const assistantMessage = await messageModel.create({
            conversation: conversationId,
            role: "assistant",
            content: answer,
        });

        console.log(assistantMessage);


        // conversation.lastMessage = assistantMessage._id;
        // await conversation.save();
        conversation.lastMessage = assistantMessage._id;

        if (conversation.title === "New Chat") {
            conversation.title = content.slice(0, 30);
        }

        await conversation.save();


        res.status(200).json({ success: true, userMessage, assistantMessage });

    }

    catch (error) {
            console.error(error);

            res.status(500).json({
                success: false,
                message: error.message,
                stack: error.stack,
            });
    }


};