"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environment = {
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGO_URI || 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/assignment?retryWrites=true&w=majority',
    redisHost: process.env.REDIS_HOST || 'redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com',
    redisPort: parseInt(process.env.REDIS_PORT || '12675'),
    redisUsername: process.env.REDIS_USERNAME || 'default',
    redisPassword: process.env.REDIS_PASSWORD || 'dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB'
};
