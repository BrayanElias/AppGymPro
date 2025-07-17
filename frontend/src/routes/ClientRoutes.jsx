// Rutas protegidas del cliente
import { Route } from "react-router-dom";
import { ClientProfile } from "@pages/client";
import DashboardLayout from "@layouts/dashboard/DashboardLayout";
import RoleRoute from "@components/auth/RoleRoute";

const ClientRoutes = () => (
    <Route path="/client">
        <Route
            path="me"
            element={
                <RoleRoute allowedRole="client">
                    <DashboardLayout>
                        <ClientProfile />
                    </DashboardLayout>
                </RoleRoute>
            }
        />
    </Route>
);

export default ClientRoutes;
