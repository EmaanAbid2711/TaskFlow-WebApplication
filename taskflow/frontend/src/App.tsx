import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login, ForgotPassword, Signup, Dashboard, Projects, Landing} from "./pages";
import { AppLayout } from "./components";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return ( 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Protected Projects */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Projects />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;