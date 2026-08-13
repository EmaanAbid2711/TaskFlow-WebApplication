import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login, ForgotPassword, ResetPassword, Signup, Dashboard, Projects, Landing, Profile, Account, Notifications, Billing, Team, UserProfile, Activity, RecycleBin} from "./pages";
import { AppLayout } from "./components";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";
import { NotificationBarProvider} from "@/context/NotificationBarContext";
import { RecycleBinProvider } from "@/context/RecycleBinContext";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return ( 
    <AuthProvider>
      <NotificationBarProvider>
      <DashboardProvider>
      <RecycleBinProvider>
      <BrowserRouter>
        <Toaster richColors />
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

          <Route
            path="/reset-password"
            element={<ResetPassword />}
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

          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Team />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/team/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <UserProfile />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/activity"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Activity />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/recycle-bin"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <RecycleBin />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/account"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Account />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/notifications"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Notifications />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings/billing"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Billing />
                </AppLayout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
      </RecycleBinProvider>
      </DashboardProvider>
      </NotificationBarProvider>
    </AuthProvider>
  );
}

export default App;