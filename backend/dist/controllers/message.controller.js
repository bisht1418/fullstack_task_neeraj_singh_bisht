"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    constructor(taskService) {
        this.fetchAllTasks = async (req, res) => {
            try {
                const allTasks = await this.taskService.getAllTasks();
                res.json(allTasks);
            }
            catch (error) {
                console.error('Error fetching tasks:', error);
                res.status(500).json({ error: 'Failed to fetch tasks' });
            }
        };
        this.taskService = taskService;
    }
}
exports.TaskController = TaskController;
