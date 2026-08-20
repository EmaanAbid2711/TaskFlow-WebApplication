# TaskFlow

## Project Overview

TaskFlow is a modern, full-stack task management web application designed to help individuals and teams organize projects, manage tasks, track progress, and collaborate efficiently.

The application provides a Kanban-style workflow where users can create projects, assign tasks to team members, update task progress using drag-and-drop functionality, add comments, upload attachments, and monitor project activities.

TaskFlow focuses on improving team productivity by providing a centralized platform for project planning, task tracking, and collaboration.

---

# How TaskFlow Works

The workflow of TaskFlow is based on project and task management:

1. **User Authentication**
   - Users can create an account and securely log in using JWT-based authentication.
   - Users can reset their password from the forgot password button on the login page.

2. **Project Management**
   - Users can create and manage projects.
   - Project owners can add team members and assign tasks.
   - Projects support soft deletion, allowing deleted projects to be moved to the Recycle Bin instead of being immediately removed from the database.

3. **Task Management**
   - Users can create tasks inside projects.
   - Tasks contain:
     - Title
     - Description
     - Priority
     - Due Date
     - Assignee
     - Attachments
     - Comments

4. **Kanban Workflow**
   - Tasks are organized into different stages:
     - To Do
     - In Progress
     - Review
     - Completed
   - Users can move tasks between stages using drag-and-drop.

5. **Collaboration**
   - Team members can:
     - Comment on tasks
     - Upload attachments
     - View activity history
     - Track project progress

6. **Dashboard Analytics**
   - Users can monitor:
     - Total projects
     - Total tasks
     - Completed tasks
     - Upcoming deadlines
     - Project progress
     - Recent activities

7. **Performance Optimization**
   - Redis caching is implemented to improve application performance.
   - Dashboard, project, and task data are cached using Redis.
   - This reduces unnecessary database queries and improves response time.

---

# Features

- User Authentication (Signup/Login)
- JWT-based Authentication
- Forgot Password Feature
- Project Management
- Project CRUD
- Soft Delete of Projects/Tasks
- Recycle Bin Support
- Task Management
- Task CRUD
- Kanban Board
- Drag & Drop Tasks
- Task Assignment
- Task Comments
- Task Attachments
- User Profile Management
- Account Management
- Notification Management
- Project Statistics
- Activity Timeline
- Dashboard Analytics
- Project Progress Tracking
- Role-Based Permissions (Owner & Assignee)
- Responsive User Interface
- In-App Notifications
- In-App Invitations
- Redis Caching
- Dashboard Caching
- Project Caching
- Task Caching
- Automatic Database Setup
- Swagger API Documentation

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- DnD Kit
- Recharts

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Redis
- Swagger API Documentation

---

# System Requirements / Prerequisites

Before running TaskFlow locally, make sure the following software is installed.

## Required Software

- Node.js (v18 or above recommended)
- npm (installed with Node.js)
- PostgreSQL (v14 or above recommended)
- Git
- Redis

## Recommended Hardware

- RAM: Minimum 4GB (8GB recommended)
- Storage: At least 1GB free space
- Processor: Modern dual-core processor or above

## Supported Operating Systems

- Windows 10/11

---

# Installation and Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/EmaanAbid2711/TaskFlow-Frontend.git
cd TaskFlow-Frontend
```

---

# Backend Setup
Navigate to the backend folder:

```bash
cd taskflow
cd backend
```

Install dependencies:
```bash
npm install
```

## Configure Environment Variables
A sample environment configuration is already provided.
Copy the example file:
```bash
cp .env.example .env
```

For Windows Command Prompt:
```bash
copy .env.example .env
```

For Windows PowerShell:
```bash
Copy-Item .env.example .env
```

Then update the values inside .env according to your local environment.

---

# Database Setup
Create a PostgreSQL database named:
- taskflow_db
Or use any database name you prefer and update the DATABASE_URL inside .env accordingly.

TaskFlow includes an automated database setup script.
Run:
```bash
npm run setup
```

This command will automatically:
- Generate the Prisma Client
- Create all database tables from the Prisma schema
- Synchronize your database with the latest schema
- No manual Prisma commands are required.

## Redis Setup
TaskFlow uses Redis for caching dashboard, project, and task data.
Make sure Redis is running locally and configure the Redis connection details in the backend .env file.
Finally, start the backend server:
```bash
npm run dev
```

- Backend will run at: http://localhost:5000

---

# Frontend Setup
Open another terminal.
Navigate to the frontend:
```bash
cd taskflow
cd frontend
```

Install dependencies:
```bash
npm install
```

## Configure Environment Variables
A sample environment configuration is already provided.

Copy the example file:
```bash
cp .env.example .env
```

For Windows Command Prompt
```bash
copy .env.example .env
```

For Windows PowerShell
```bash
Copy-Item .env.example .env
```
Then update the values inside .env according to your local environment.

## Start Frontend
```bash
npm run dev
```

- Frontend will run at:http://localhost:5173

---

# Running the Application
It needs two terminals.

## Terminal 1: Backend
```bash
cd taskflow/backend
npm install
npm run setup
npm run dev
```

## Terminal 2 – Frontend
```bash
cd taskflow/frontend
npm install
npm run dev
```

Open: http://localhost:5173

---

# API Documentation
Swagger API documentation is available after starting the backend:

http://localhost:5000/api-docs

Swagger provides documentation and testing access for the backend APIs.

---

# Deployment

TaskFlow is live and fully deployed.
The frontend is deployed on Vercel, while the backend and PostgreSQL database are deployed on Railway. The deployed frontend communicates directly with the deployed backend, providing a complete production-ready experience.

## Live Links
Service    |    Platform	| Link
Frontend   |    Vercel	   | https://task-flow-frontend-woad.vercel.app
Backend    |    Railway	   | https://taskflow-backend-production-56ac.up.railway.app
API Docs	  |    Railway	   | https://taskflow-backend-production-56ac.up.railway.app/api-docs

---

# Current Implemented Features
- Authentication
- Forgot Password Feature
- Project CRUD
- Soft Delete of Projects
- Recycle Bin Support
- Task CRUD
- Kanban Board
- Drag & Drop Task Management
- Task Assignment
- Comments
- File Attachments
- Activity Timeline
- Dashboard Statistics
- Project Progress Tracking
- Owner & Assignee Permissions
- In-App Notifications
- In-App Invitations
- Redis Caching
- Dashboard Caching
- Project Caching
- Task Caching
- Automatic Database Setup
- Swagger API Documentation

---

## Author:
Developed by *Emaan Abid*