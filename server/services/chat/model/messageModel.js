import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversation:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "conversation",
            required: true,
        },

        role:
        {
            type: String,
            enum: ["user", "assistant", "system"],
            required: true,
        },

        content:
        {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);


const messageModel = mongoose.model( "message", messageSchema );


export default messageModel;