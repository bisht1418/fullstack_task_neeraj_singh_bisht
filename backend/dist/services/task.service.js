"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const task_model_1 = require("../models/task.model");
const appConstants_1 = require("../config/appConstants");
const environment_1 = require("../config/environment");
class TaskService {
    constructor() {
        this.redis = new ioredis_1.default({
            host: environment_1.environment.redisHost,
            port: environment_1.environment.redisPort,
            username: environment_1.environment.redisUsername,
            password: environment_1.environment.redisPassword
        });
    }
    // Get tasks from Redis cache
    async getCachedTasks() {
        const tasksStr = await this.redis.get(appConstants_1.REDIS_KEY);
        return tasksStr ? JSON.parse(tasksStr) : [];
    }
    // Move tasks from Redis to MongoDB and clear cache
    async moveTasksToMongo(tasks) {
        if (tasks.length === 0)
            return;
        // Convert tasks to the format expected by Mongoose
        const taskDocs = tasks.map(task => (0, task_model_1.toTaskDocument)(task));
        await task_model_1.TaskModel.insertMany(taskDocs);
        await this.redis.set(appConstants_1.REDIS_KEY, JSON.stringify([]));
        console.log(`Moved ${tasks.length} tasks to MongoDB`);
    }
    // Helper function to check cache size and move to MongoDB if necessary
    async checkCacheSize() {
        const cachedTasks = await this.getCachedTasks();
        if (cachedTasks.length > appConstants_1.MAX_CACHE_ITEMS) {
            console.log('Cache limit reached, moving tasks to MongoDB');
            await this.moveTasksToMongo(cachedTasks);
        }
    }
    // Add a new task
    async addTask(taskText) {
        const newTask = {
            id: new Date().getTime().toString(),
            text: taskText,
            completed: false,
            createdAt: new Date()
        };
        const tasks = await this.getCachedTasks();
        tasks.push(newTask);
        await this.redis.set(appConstants_1.REDIS_KEY, JSON.stringify(tasks));
        // Check if we need to move tasks to MongoDB
        await this.checkCacheSize();
    }
    // Toggle task completion
    async toggleTask(taskId) {
        const tasks = await this.getCachedTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            // Task found in cache
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            await this.redis.set(appConstants_1.REDIS_KEY, JSON.stringify(tasks));
        }
        else {
            // Task might be in MongoDB
            const task = await task_model_1.TaskModel.findOne({ customId: taskId });
            if (task) {
                task.completed = !task.completed;
                await task.save();
            }
        }
    }
    // Delete a task
    async deleteTask(taskId) {
        const tasks = await this.getCachedTasks();
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        if (filteredTasks.length !== tasks.length) {
            // Task was in cache
            await this.redis.set(appConstants_1.REDIS_KEY, JSON.stringify(filteredTasks));
        }
        else {
            // Task might be in MongoDB
            await task_model_1.TaskModel.deleteOne({ customId: taskId });
        }
    }
    // Get all tasks from both Redis and MongoDB
    async getAllTasks() {
        const cachedTasks = await this.getCachedTasks();
        const mongoTasks = await task_model_1.TaskModel.find({}).lean();
        // Convert Mongoose documents to Task objects
        const formattedMongoTasks = mongoTasks.map(doc => {
            return {
                id: doc.customId,
                text: doc.text,
                completed: doc.completed,
                createdAt: doc.createdAt
            };
        });
        return [...cachedTasks, ...formattedMongoTasks].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
}
exports.TaskService = TaskService;
