/*

iss ko format krr , jitna possible hoo maximum compact krr de (block of code wise) , aurr try catch ko alal alag line me aurr  readble bnane k liye kaai saare tab(4 space) ka use krr, naya block of code me 2 line ka gap diyo,, matlab mai line bachane k liye nhi kra kra yeh - mera style hai aise krke pdhne kaa , Haan, related cheezon ko maximum compact kar 

*/

import api from "./axios";

// Create New Conversation
export const createConversation = async (title = "New Chat") => {
    try
    {
        const { data } = await api.post("/api/chat/conversation", { title });
        return data;
    }
    catch (error)
    {
        throw error.response?.data || error;
    }
};


// Get All Conversations
export const getConversations = async () => {
    try
    {
        const { data } = await api.get("/api/chat/conversation");
        return data;
    }
    catch (error)
    {
        throw error.response?.data || error;
    }
};


// Get Single Conversation
export const getConversation = async (id) => {
    try
    {
        const { data } = await api.get(`/api/chat/conversation/${id}`);
        return data;
    }
    catch (error)
    {
        throw error.response?.data || error;
    }
};


// Save Message
export const saveMessage = async (payload) => {
    try
    {
        const { data } = await api.post("/api/chat/message", payload);
        return data;
    }
    catch (error)
    {
        throw error.response?.data || error;
    }
};


// Delete Conversation
export const deleteConversation = async (id) => {
    try
    {
        const { data } = await api.delete(`/api/chat/conversation/${id}`);
        return data;
    }
    catch (error)
    {
        throw error.response?.data || error;
    }
};
