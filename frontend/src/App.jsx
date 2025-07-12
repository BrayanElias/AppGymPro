import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import ClientProfile from "./pages/ClientProfile";
import RoleRoute from "./components/RoleRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <RoleRoute allowedRole="admin">
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/trainer/dashboard"
        element={
          <RoleRoute allowedRole="trainer">
            <DashboardLayout>
              <TrainerDashboard />
            </DashboardLayout>
          </RoleRoute>
        }
      />


      <Route
        path="/client/me"
        element={
          <RoleRoute allowedRole="client">
            <DashboardLayout>
              <ClientProfile />
            </DashboardLayout>
          </RoleRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Ruta comodín para cualquier ruta no encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
