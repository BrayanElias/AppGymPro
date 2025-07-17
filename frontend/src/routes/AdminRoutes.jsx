// src/routes/AdminRoutes.jsx
import { Route } from "react-router-dom";
import { AdminDashboard } from "@pages/admin";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import RoleRoute from "@components/auth/RoleRoute";

const AdminRoutes = (
    <>
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
    </>
);

export default AdminRoutes;
