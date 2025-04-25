import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/assignment?retryWrites=true&w=majority',
  redisHost: process.env.REDIS_HOST || 'redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  redisPort: parseInt(process.env.REDIS_PORT || '12675'),
  redisUsername: process.env.REDIS_USERNAME || 'default',
  redisPassword: process.env.REDIS_PASSWORD || 'dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB'
};