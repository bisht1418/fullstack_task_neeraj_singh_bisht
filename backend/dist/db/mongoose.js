"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../config/environment");
const connect = async () => {
    try {
        await mongoose_1.default.connect(environment_1.environment.mongoUri, {
            dbName: 'assignment'
        });
        console.log('✅ MongoDB connected via Mongoose');
        const collections = await mongoose_1.default.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
    }
    catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1);
    }
};
exports.connect = connect;
mongoose_1.default.connection.on('connected', () => console.log('Mongoose connection established'));
mongoose_1.default.connection.on('error', (err) => console.error('Mongoose connection error:', err));
mongoose_1.default.connection.on('disconnected', () => console.log('Mongoose connection disconnected'));
