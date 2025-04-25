import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { connect } from './db/mongoose';
import taskRoutes from './routes/message.routes';
import { environment } from './config/environment';
import { TaskService } from './services/task.service';
import { SocketHandler } from './services/socketHandler';

async function startServer() {
  try {
    await connect();

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    app.use(cors());
    app.use(express.json());

    const taskService = new TaskService();

    new SocketHandler(io, taskService);

    app.use('/api/tasks', taskRoutes);

    const PORT = environment.port;
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();