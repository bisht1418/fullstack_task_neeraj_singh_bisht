"use client";

import { useState, useEffect } from "react";
import { Plus, BookOpen } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
console.log("serverURL", serverURL);

export default function NotesApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newNote, setNewNote] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);
    newSocket.on("tasks", (updatedTasks: Task[]) => {
      setTasks(updatedTasks);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${serverURL}/api/tasks/fetchAllTasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddNote = () => {
    if (newNote.trim() && socket) {
      socket.emit("add", newNote);
      setNewNote("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddNote();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 flex items-center gap-2 border-b">
          <div className="w-6 h-6 flex-shrink-0">
            <BookOpen className="w-6 h-6 text-amber-800" />
          </div>
          <h1 className="text-xl font-bold">Task App</h1>
        </div>

        <div className="p-4 flex gap-2">
          <input
            type="text"
            placeholder="New Task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-800"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-amber-800 text-white rounded-md flex items-center gap-1 hover:bg-amber-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        <div className="px-4 pb-2">
          <h2 className="font-bold text-lg mb-2">Tasks</h2>
          <div className="max-h-64 overflow-y-auto pr-1">
            {tasks?.map((task) => (
              <div
                key={task.id}
                className="py-3 border-b border-gray-200 last:border-b-0"
              >
                {task.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
