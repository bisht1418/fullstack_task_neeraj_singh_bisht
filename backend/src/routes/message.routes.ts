import { Router } from 'express';
import { TaskController } from '../controllers/message.controller';
import { TaskService } from '../services/task.service';

const router = Router();
const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.get('/fetchAllTasks', taskController.fetchAllTasks);

export default router;