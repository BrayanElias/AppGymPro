// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client" 
import App from "./App";
import "./index.css";

// Contexto global de autenticación (maneja login, token, usuario actual)
import { AuthProvider } from "@context/auth/AuthContext";

// Enrutador de React para navegación entre vistas
import { BrowserRouter } from "react-router-dom";

// Montamos el árbol de React en el elemento con ID "root" del HTML principal
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Contexto global de autenticación envuelve toda la app */}
    <AuthProvider>
      {/* React Router para navegación SPA (Single Page Application) */}
      <BrowserRouter>
        {/* Componente principal de la aplicación */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
