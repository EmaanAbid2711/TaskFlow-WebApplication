import app from "./app";
import { env } from "./config/env";
import redis from "./config/redis";

const startServer = async () => {
try {
await redis.ping();

console.log("Redis connected successfully");

app.listen(env.PORT, () => {
  console.log(
    `Server running on http://localhost:${env.PORT}`
  );
});

} catch (error) {
console.error(
"Failed to connect to Redis:",
error
);

process.exit(1);

}
};

startServer();
