import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login, ForgotPassword, Signup} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
         path="/signup"
         element={<Signup />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;