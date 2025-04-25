# 🚀 Task Management System

A **full-stack real-time task management system** built with **Node.js**, **Next.js**, **Socket.IO**, **Redis**, and **MongoDB**. Designed for scalability, responsiveness, and real-time collaboration.

---

## 🧩 Features

- ✅ Real-time updates with **Socket.IO**
- ⚡ Hybrid storage with **Redis (cache)** + **MongoDB (persistence)**
- 🔁 Automatic data migration from Redis to MongoDB when cache limit is exceeded
- 🧪 REST API for task management
- 🖥️ Responsive frontend with **Next.js**
- 🌐 Deployed **Vercel**, and **CI/CD**

---

## 🖼️ Live Demos

- **Frontend App**: [https://todo-websocket.vercel.app/](https://todo-websocket.vercel.app/)
- **Backend App**: [https://taskmanager.example.com](https://taskmanager.example.com)

---

## 🛠️ Technologies Used

### 🔙 Backend

- **Node.js** (v18+)
- **Express** – Web server framework
- **Socket.IO** – Real-time communication
- **Mongoose** – MongoDB ODM
- **Redis** – In-memory caching
- **TypeScript** – Type safety

### 🔜 Frontend

- **Next.js** (v14+)
- **React** – UI Library
- **Socket.IO Client** – Real-time data fetching
- **Tailwind CSS** – Utility-first styling
- **TypeScript** – Type safety

---

## ⚙️ Installation

### 🔧 Backend Setup

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager/backend
npm install
```

Create a `.env` file from `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/assignment
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3001
```

Start the backend server:

```bash
npm run dev
```

### 💻 Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start the frontend server:

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Endpoint                    | Method | Description                          |
|----------------------------|--------|--------------------------------------|
| `/api/tasks/fetchAllTasks` | GET    | Fetch all tasks (Redis + MongoDB)    |
| `Socket.IO add` event      | -      | Add new task in real-time            |

---

## ⚙️ Configuration

Configuration values can be found in `appConstants.ts`:

```ts
export const REDIS_KEY = 'FULLSTACK_TASK_NEERAJ';
export const MONGO_COLLECTION = 'assignment_neeraj';
export const MAX_CACHE_ITEMS = 50; // Redis cache limit
```

---

## 🚀 Deployment

### 🌐 Backend (Render)

- Node.js 18
- **MongoDB Atlas** – Cloud database
- **Redis Elasticache** – Managed caching

### 🌍 Frontend (Vercel)

- GitHub integration with CI/CD
- Environment variable support
- Global CDN distribution

---

## 🔄 Development Workflow

1. Make code changes (backend/frontend)
2. Test locally
3. Push to `main` branch
4. Auto-deployment to **Vercel** (Frontend) & **AWS** (Backend)
5. Monitor via Vercel dashboard & AWS Console

---

## 🚧 CI/CD Pipeline

🛠️ GitHub → Vercel (Frontend)  
🛠️ GitHub → Rennder (Backend)  
📦 Auto build + deploy on push to `main`

---

## 🤝 Contributing

We welcome contributions!

```bash
# Fork the repository
# Create your branch
git checkout -b feature/amazing-feature

# Make your changes
git commit -m "Add some amazing feature"

# Push the branch
git push origin feature/amazing-feature
```

Then, open a **Pull Request** 🚀

---

## 📄 License

Licensed under the [MIT License](./LICENSE).
