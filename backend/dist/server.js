"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const mongoose_1 = require("./db/mongoose");
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const environment_1 = require("./config/environment");
const task_service_1 = require("./services/task.service");
const socketHandler_1 = require("./services/socketHandler");
async function startServer() {
    try {
        await (0, mongoose_1.connect)();
        const app = (0, express_1.default)();
        const httpServer = (0, http_1.createServer)(app);
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        const taskService = new task_service_1.TaskService();
        new socketHandler_1.SocketHandler(io, taskService);
        app.use('/api/tasks', message_routes_1.default);
        const PORT = environment_1.environment.port;
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
startServer();
