import redis from "../shared/config/redis.js";

const authMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    //const session = await redis.get(`session-${sessionId}`);
    const session = await redis.get(`session-${sessionId}`);

    console.log("SESSION ID :", sessionId);
    console.log("SESSION :", session);

    if (!session) {
        return res.status(401).json({
            success: false,
            message: "Session Expired",
        });
    }


    

    req.user = JSON.parse(session);

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authMiddleware;