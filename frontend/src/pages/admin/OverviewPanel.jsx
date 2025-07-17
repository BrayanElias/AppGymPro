/**
 * Panel de supervisión general para el administrador.
 * Este componente muestra métricas clave como:
 * - Total de entrenadores (desde backend)
 * - Total de clientes (desde backend)
 */

import { useEffect, useState } from "react";
import { useAuth } from "@context/auth/AuthContext"; // Contexto para acceder al token JWT

const OverviewPanel = () => {
    const [trainerCount, setTrainerCount] = useState(null);
    const [clientCount, setClientCount] = useState(null);
    const { token } = useAuth();

    // Al montar el componente, se solicitan las métricas desde el backend
    useEffect(() => {
        const fetchTrainerCount = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/trainers/count`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("No se pudo obtener el conteo de entrenadores");
                const data = await response.json();
                setTrainerCount(data.count);
            } catch (error) {
                console.error("Error al contar entrenadores:", error);
                setTrainerCount("—");
            }
        };

        const fetchClientCount = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/clients/count`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("No se pudo obtener el conteo de clientes");
                const data = await response.json();
                setClientCount(data.count);
            } catch (error) {
                console.error("Error al contar clientes:", error);
                setClientCount("—");
            }
        };

        fetchTrainerCount();
        fetchClientCount();
    }, [token]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Supervisión general</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                {/* Total de entrenadores */}
                <div className="bg-blue-100 text-blue-900 p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total de entrenadores</h3>
                    <p className="text-3xl">
                        {trainerCount !== null ? trainerCount : "Cargando..."}
                    </p>
                </div>

                {/* Total de clientes */}
                <div className="bg-green-100 text-green-900 p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total de clientes</h3>
                    <p className="text-3xl">
                        {clientCount !== null ? clientCount : "Cargando..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OverviewPanel;
