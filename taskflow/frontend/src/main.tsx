import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,

          style: {
            borderRadius: "10px",
            background: "#ffffff",
            color: "#1e293b",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
          },

          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>
);