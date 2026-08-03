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
   - Users can reset the password from the forget password button in the login page

2. **Project Management**
   - Users can create and manage projects.
   - Project owners can add team members and assign tasks.

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

---

# Features

- User Authentication (Signup/Login)
- JWT-based Authentication
- Forget password feature
- Project Management
- Task Management
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
- Role-Based Permissions (Owner & Assignee)
- Responsive User Interface

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
- Swagger API Documentation

---

# System Requirements / Prerequisites

Before running TaskFlow locally, make sure the following software is installed.

## Required Software

- Node.js (v18 or above recommended)
- npm (installed with Node.js)
- PostgreSQL (v14 or above recommended)
- Git

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

Project structure:

```
TaskFlow
│
├── frontend
│
└── backend
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

Windows Command Prompt:
```cmd
copy .env.example .env
```

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```
Then update the values inside `.env` according to your local environment.

### Database Setup

Create a PostgreSQL database:

```
taskflow
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Start backend server:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal.

Navigate to frontend:

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

Windows Command Prompt:
```cmd
copy .env.example .env
```

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```
Then update the values inside `.env` according to your local environment.

## Start frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

# Running the Application

You need two terminals:

## Backend

```bash
cd backend

npm run dev
```

## Frontend

```bash
cd frontend

npm run dev
```

Open your browser:

```
http://localhost:5173
```

---

# API Documentation

Swagger API documentation is available after starting the backend:

```
http://localhost:5000/api-docs
```

Swagger provides documentation and testing access for all backend APIs.

---

# Deployment

TaskFlow is live and fully deployed!
Frontend is deployed on Vercel and backend and database are deployed on railway.
The frontend and backend are connected, only opening the deployed frontend link will run the complete app.
You can access the live services using the links below:

## Live Links

| **Frontend App** | Vercel | `https://task-flow-frontend-woad.vercel.app` |
| **Backend API** | Railway | `https://taskflow-backend-production-df3c.up.railway.app/` |
| **API Docs** | Railway | `https://taskflow-backend-production-df3c.up.railway.app/api-docs` |

---

# Current Implemented Features

- Authentication
- Forget password feature
- Project CRUD
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
- In app Notifications

---

# Future Improvements

- Email Invitations

---

# Author

Developed by **Emaan Abid**