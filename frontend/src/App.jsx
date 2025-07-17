// src/App.jsx

import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  Unauthorized,
  NotFound,
} from "@pages";

import { AdminRoutes, TrainerRoutes, ClientRoutes } from "@routes";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />

      {/* Protegidas por rol */}
      {AdminRoutes}
      {TrainerRoutes}
      {ClientRoutes}
    </Routes>
  );
}

export default App;
