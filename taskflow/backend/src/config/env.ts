import dotenv from "dotenv";

dotenv.config();

export const env = {
PORT: process.env.PORT || "5000",

DATABASE_URL: process.env.DATABASE_URL!,

JWT_SECRET: process.env.JWT_SECRET!,

UPSTASH_REDIS_REST_URL:
process.env.UPSTASH_REDIS_REST_URL!,

UPSTASH_REDIS_REST_TOKEN:
process.env.UPSTASH_REDIS_REST_TOKEN!,
};
