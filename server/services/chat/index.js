
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";

import express from "express";
import connectDB from "./config/db.js";
import router from "./route/chatRoutes.js";

import cookieParser from "cookie-parser";

import cors from "cors";

connectDB();

const app = express();

app.use(express.json());

app.use(cors({origin: process.env.FRONTEND_URL , credentials: true}));
app.use(cookieParser());   // cookie read krne k liye browser se , gateway me cookie parser tab hota jab auth middleware wha hota

app.use("/" , router);

app.get("/" , (req , res) => {res.send("Hello from Auth")});

const port = process.env.PORT;
app.listen(port , () => {console.log(`auth started at ${port}`)});