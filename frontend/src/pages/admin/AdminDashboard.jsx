// src/pages/admin/AdminDashboard.jsx

import { useState } from "react";

// Importamos los paneles del dashboard
import TrainersPanel from "@pages/admin/TrainersPanel";
import OverviewPanel from "@pages/admin/OverviewPanel";
import AssignmentsPanel from "@pages/admin/AssignmentsPanel";

/**
 * 🎛 AdminDashboard
 * Panel principal del administrador con navegación entre:
 * - Supervisión general
 * - Gestión de entrenadores
 * - Asignación de clientes
 */
const AdminDashboard = () => {
  // Estado para manejar la sección activa del dashboard
  const [activeTab, setActiveTab] = useState("overview");

  /**
   * Renderiza el contenido del panel según la pestaña activa
   */
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPanel />;
      case "trainers":
        return <TrainersPanel />;
      case "assignments":
        return <AssignmentsPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <div className="space-y-6">
      {/*Título del panel */}
      <h1 className="text-3xl font-bold text-gray-900">Dashboard del Administrador</h1>

      {/*Navegación interna del dashboard */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "overview" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setActiveTab("overview")}
        >
          Supervisión
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "trainers" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setActiveTab("trainers")}
        >
          Entrenadores
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "assignments" ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setActiveTab("assignments")}
        >
          Asignaciones
        </button>
      </div>

      {/*Contenido dinámico del panel */}
      <div className="bg-white shadow rounded p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
