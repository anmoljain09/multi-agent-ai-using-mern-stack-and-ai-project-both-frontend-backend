import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        title:
        {
            type: String,
            default: "New Chat",
        },

        lastMessage:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
            default: null,
        },
    },

    {
        timestamps: true,
    }
);


const conversationModel = mongoose.model( "conversation", conversationSchema );


export default conversationModel;