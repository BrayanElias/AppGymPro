import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import ClientProfile from "./pages/ClientProfile";
import RoleRoute from "./components/RoleRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

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
          <RoleRoute allowedRole="entrenador">
            <DashboardLayout>
              <TrainerDashboard />
            </DashboardLayout>
          </RoleRoute>
        }
      />

      <Route
        path="/client/me"
        element={
          <RoleRoute allowedRole="cliente">
            <DashboardLayout>
              <ClientProfile />
            </DashboardLayout>
          </RoleRoute>
        }
      />
    </Routes>
  );
}

export default App;
