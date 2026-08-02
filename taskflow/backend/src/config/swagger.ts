import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: `
# TaskFlow Backend API

TaskFlow is a project management platform API.

## Features

- User authentication with JWT
- Project management
- Task management
- Team collaboration
- Task comments and attachments
- Activity tracking
- Notifications
- Account and billing management

## Authentication

Most endpoints require JWT authentication.

To authenticate:

1. Login using:

POST /api/auth/login

2. Copy the returned JWT token.

3. Click the **Authorize** button in Swagger.

4. Enter: Bearer YOUR_TOKEN

All protected requests will automatically include the token.
      `,
    },
    servers: [
      {
        url: "https://taskflow-backend-production-df3c.up.railway.app",
        description: "Production Server",
      },
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token obtained from /api/auth/login",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm123abc456",
            },
            name: {
              type: "string",
              example: "Emaan Abid",
            },
            email: {
              type: "string",
              example: "emaan@example.com",
            },
            avatar: {
              type: "string",
              nullable: true,
              example: "/uploads/profile-images/avatar.png",
            },
            role: {
              type: "string",
              example: "Developer",
            },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cmproject123",
            },
            name: {
              type: "string",
              example: "TaskFlow",
            },
            description: {
              type: "string",
              example: "Project management application",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cmtask123",
            },
            title: {
              type: "string",
              example: "Create login page",
            },
            description: {
              type: "string",
              example: "Build responsive login UI",
            },
            status: {
              type: "string",
              enum: ["TODO", "PROGRESS", "REVIEW", "COMPLETED"],
              example: "TODO",
            },
            priority: {
              type: "string",
              enum: ["HIGH", "MEDIUM", "LOW"],
              example: "HIGH",
            },
            dueDate: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
          },
        },
        Activity: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cmactivity123",
            },
            type: {
              type: "string",
              example: "TASK_CREATED",
            },
            message: {
              type: "string",
              example: "Created a new task",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Notification: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cmnotification123",
            },
            title: {
              type: "string",
              example: "Task Assigned",
            },
            message: {
              type: "string",
              example: "You were assigned a new task",
            },
            isRead: {
              type: "boolean",
              example: false,
            },
          },
        },
        Billing: {
          type: "object",
          properties: {
            plan: {
              type: "string",
              enum: ["FREE", "PRO"],
              example: "FREE",
            },
            monthlyPrice: {
              type: "number",
              example: 0,
            },
            billingCycle: {
              type: "string",
              example: "Monthly",
            },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            page: {
              type: "integer",
              example: 1,
            },
            limit: {
              type: "integer",
              example: 20,
            },
            totalPages: {
              type: "integer",
              example: 5,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Invalid request data",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                },
                user: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;