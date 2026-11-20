import express from "express";
import userController from "../controller/userController.js";
import authMiddleware from "../../../gateway/authMiddleware.js";

const router = express.Router();

router.post('/google' , userController.registerOrLoginController);
router.post('/logout' , userController.logoutController);
//router.post("/me", authMiddleware , userController.getCurrentUserController);
router.post("/me" , userController.getCurrentUserController);

//dekh yeh tha naa , ki agar login hai toh user bhej do , aur nhi hai toh user mat bheja , yeh toh valid hai iss me issue kya hai , abb login nhi hai toh bhi user jaa rha hai ?
//matlab abb hum ne gett user controller me hii auth middleware ki code likh diya hainaa

export default router;  