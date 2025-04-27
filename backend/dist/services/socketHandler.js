"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHandler = void 0;
class SocketHandler {
    constructor(io, taskService) {
        this.io = io;
        this.taskService = taskService;
        this.init();
    }
    init() {
        this.io.on('connection', (socket) => {
            console.log('New client connected', socket.id);
            socket.on('add', async (taskText) => {
                try {
                    console.log('Adding task:', taskText);
                    await this.taskService.addTask(taskText);
                    this.io.emit('tasks', await this.taskService.getAllTasks());
                }
                catch (error) {
                    console.error('Error adding task:', error);
                }
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected', socket.id);
            });
        });
    }
}
exports.SocketHandler = SocketHandler;
