import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login, ForgotPassword, Signup, Dashboard, Projects, Landing} from "./pages";
import {AppLayout} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <AppLayout>
              <Projects />
            </AppLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;