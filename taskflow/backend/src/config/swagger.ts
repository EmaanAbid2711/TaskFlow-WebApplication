import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description:
        "TaskFlow Backend API Documentation",
    },

    servers: [
      {
        url: "https://taskflow-backend-production-df3c.up.railway.app",
        description: "Production Server",
      },
      {
        url: "http://localhost:5000",
        description: "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
  ],
};

const swaggerSpec =
  swaggerJsdoc(swaggerOptions);

export default swaggerSpec;