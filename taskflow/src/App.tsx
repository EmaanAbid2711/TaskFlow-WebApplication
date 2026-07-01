import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login, ForgotPassword} from "./pages";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;