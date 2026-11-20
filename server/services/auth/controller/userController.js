import userModel from "../model/userModel.js";
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import crypto from "crypto";
import redis from "../../../shared/config/redis.js"

const registerOrLoginController = async (req , res) => {
    try{
        const {token} = req.body;
        console.log(token);
        const decoded = await getAuth(app).verifyIdToken(token);
        console.log(decoded);
        let user = await userModel.findOne({firebaseUid:decoded.uid});
        console.log(user);

        if(!user) {
            user = await userModel.create({firebaseUid:decoded.uid , username:decoded.name , email:decoded.email , avatar:decoded.picture});
        }

        const sessionId = crypto.randomUUID();
        await redis.set(`session-${sessionId}` , JSON.stringify({id:user._id , username:user.username , email:user.email , avatar:user.avatar}),"EX",7*24*60*60);
        res.cookie("session" , sessionId , {httpOnly:true , secure:false , sameSite:"lax" , maxAge:7*24*60*60*1000 });

        return res.status(200).send({user});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

const logoutController = async (req , res) => {
    try{
        const sessionId = req.cookies?.session;
        await redis.del(`session-${sessionId}`);
        res.clearCookie("session");
        return res.status(200).send({message : "logout successfuly"});
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({message: `logout message ${error}`});
    }
}

// const getCurrentUserController = async (req, res) => {
//     try {
//         return res.status(200).json({success: true,user: req.user,});
//     } 
//     catch (error) {
//         return res.status(500).json({success: false,message: error.message,});
//     }
// };

const getCurrentUserController = async (req, res) => {
    try {
        const sessionId = req.cookies?.session;

        // session cookie hi nahi hai -> normal response, error nahi
        if (!sessionId) {
            return res.status(200).json({ success: true, user: null });
        }

        const session = await redis.get(`session-${sessionId}`);

        // session expire/invalid -> yeh bhi normal response
        if (!session) {
            return res.status(200).json({ success: true, user: null });
        }

        return res.status(200).json({ success: true, user: JSON.parse(session) });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export default {registerOrLoginController , logoutController , getCurrentUserController};