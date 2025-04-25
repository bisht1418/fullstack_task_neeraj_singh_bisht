import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';

export class SocketHandler {
  private io: Server;
  private taskService: TaskService;

  constructor(io: Server, taskService: TaskService) {
    this.io = io;
    this.taskService = taskService;
    this.init();
  }

  private init(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('New client connected', socket.id);

      socket.on('add', async (taskText: string) => {
        try {
          console.log('Adding task:', taskText);
          await this.taskService.addTask(taskText);
          this.io.emit('tasks', await this.taskService.getAllTasks());
        } catch (error) {
          console.error('Error adding task:', error);
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
      });
    });
  }
}