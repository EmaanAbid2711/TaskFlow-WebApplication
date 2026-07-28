# TaskFlow

TaskFlow is a modern and responsive task management web application that helps teams organize projects, assign tasks, track progress, and collaborate efficiently.

## Features

- User Authentication (Signup/Login)
- Project Management
- Task Management
- Kanban Board
- Drag & Drop Tasks
- Task Assignment
- Task Comments
- Task Attachments
- User Profile Management
- Project Statistics
- Role-Based Permissions (Owner & Assignee)
- Responsive UI

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- DnD Kit

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger API Documentation


## Installation

### 1. Clone the repository

```bash
git clone https://github.com/EmaanAbid2711/TaskFlow-Frontend.git
cd TaskFlow
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and configure the required environment variables.

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file and configure the API URL.

Start the frontend:

```bash
npm run dev
```

---

## Environment Variables

### Backend

```
DATABASE_URL=
JWT_SECRET=
PORT=
```

### Frontend

```
VITE_API_URL=
```

---

## API Documentation

Swagger documentation is available after starting the backend:

```
http://localhost:5000/api-docs
```

---

## Current Features

- Authentication
- Project CRUD
- Task CRUD
- Drag & Drop Kanban Board
- Task Assignment
- Comments
- Attachments
- Project Progress Tracking
- Owner & Assignee Permissions

---

## Future Improvements

- Notifications
- Email Invitations
- Real-time Updates
- Activity Dashboard
- Dark Mode

---

## Author

Developed by **Emaan Abid**