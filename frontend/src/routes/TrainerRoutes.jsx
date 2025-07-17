// Rutas protegidas del entrenador
import { Route } from "react-router-dom";
import { TrainerDashboard } from "@pages/trainer";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import RoleRoute from "@components/auth/RoleRoute";

const TrainerRoutes = () => (
    <Route path="/trainer">
        <Route
            path="dashboard"
            element={
                <RoleRoute allowedRole="trainer">
                    <DashboardLayout>
                        <TrainerDashboard />
                    </DashboardLayout>
                </RoleRoute>
            }
        />
    </Route>
);

export default TrainerRoutes;
