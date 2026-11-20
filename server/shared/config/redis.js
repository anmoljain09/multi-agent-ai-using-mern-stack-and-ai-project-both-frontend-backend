console.log("🔥 Redis file loaded");
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

console.log({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
});

redis.on("connect", () => {
  console.log("✅ Redis Cloud Connected");
});

redis.on("error", (err) => {
  console.log("Redis Error:", err);
});

export default redis;


/*

const redis = new Redis("redis://redis:6379");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});


*/

