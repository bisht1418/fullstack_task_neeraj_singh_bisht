import Redis from 'ioredis';
import { Task, TaskModel, toTaskDocument } from '../models/task.model';
import {  MAX_CACHE_ITEMS, REDIS_KEY } from '../config/appConstants';
import { environment } from '../config/environment';

export class TaskService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: environment.redisHost,
      port: environment.redisPort,
      username: environment.redisUsername,
      password: environment.redisPassword
    });
  }

  async getCachedTasks(): Promise<Task[]> {
    const tasksStr = await this.redis.get(REDIS_KEY);
    return tasksStr ? JSON.parse(tasksStr) : [];
  }

  async moveTasksToMongo(tasks: Task[]): Promise<void> {
    if (tasks.length === 0) return;
    
    const taskDocs = tasks.map(task => toTaskDocument(task));
    
    await TaskModel.insertMany(taskDocs);
    await this.redis.set(REDIS_KEY, JSON.stringify([]));
    console.log(`Moved ${tasks.length} tasks to MongoDB`);
  }

  async checkCacheSize(): Promise<void> {
    const cachedTasks = await this.getCachedTasks();
    if (cachedTasks.length > MAX_CACHE_ITEMS) {
      console.log('Cache limit reached, moving tasks to MongoDB');
      await this.moveTasksToMongo(cachedTasks);
    }
  }

  async addTask(taskText: string): Promise<void> {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      text: taskText,
      completed: false,
      createdAt: new Date()
    };

    const tasks = await this.getCachedTasks();
    tasks.push(newTask);
    
    await this.redis.set(REDIS_KEY, JSON.stringify(tasks));
    
    await this.checkCacheSize();
  }

  async getAllTasks(): Promise<Task[]> {
    const cachedTasks = await this.getCachedTasks();
    const mongoTasks = await TaskModel.find({}).lean();
    
    const formattedMongoTasks = mongoTasks.map(doc => {
      return {
        id: doc.customId,
        text: doc.text,
        completed: doc.completed,
        createdAt: doc.createdAt
      } as Task;
    });
    
    return [...cachedTasks, ...formattedMongoTasks].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}