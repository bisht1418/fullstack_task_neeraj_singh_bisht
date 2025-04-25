import mongoose, { Schema, Document } from 'mongoose';

export interface ITask {
  text: string;
  completed: boolean;
  createdAt: Date;
  customId: string; 
}

export interface TaskDocument extends ITask, Document {}

const TaskSchema: Schema = new Schema({
  customId: { type: String, required: true, unique: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema, 'assignment_neeraj');

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const toTask = (doc: TaskDocument): Task => {
  return {
    id: doc.customId,
    text: doc.text,
    completed: doc.completed,
    createdAt: doc.createdAt
  };
};

export const toTaskDocument = (task: Task): Partial<ITask> => {
  return {
    customId: task.id,
    text: task.text,
    completed: task.completed,
    createdAt: task.createdAt
  };
};