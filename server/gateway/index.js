import "dotenv/config";

import express from "express";
//import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";

//dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({origin : process.env.FRONTEND_URL , credentials : true}))

app.use(cookieParser());

// app.use("/api/auth" , proxy(process.env.AUTH_SERVICE_URL));
// app.use("/api/chat" , proxy(process.env.CHAT_SERVICE_URL));
// app.use("/api/agent" , proxy(process.env.AGENT_SERVICE_URL));

app.use(
    "/api/auth",
    proxy(process.env.AUTH_SERVICE_URL, {
        proxyReqPathResolver: (req) =>
            req.originalUrl.replace("/api/auth", ""),
    })
);

app.use(
    "/api/chat",
    proxy(process.env.CHAT_SERVICE_URL, {
        proxyReqPathResolver: (req) =>
            req.originalUrl.replace("/api/chat", ""),
    })
);

app.use(
    "/api/agent",
    proxy(process.env.AGENT_SERVICE_URL, {
        proxyReqPathResolver: (req) =>
            req.originalUrl.replace("/api/agent", ""),
    })
);




app.get("/" , (req , res) => {res.send("Hello from gateway")});

const port = process.env.PORT;
app.listen(port , () => {console.log(`gateway started at ${port}`)});