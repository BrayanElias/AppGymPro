// src/pages/admin/OverviewPanel.jsx

/**
 * Panel de supervisión general para el administrador.
 * Aquí se puede mostrar información como:
 * - Total de usuarios, entrenadores, clientes
 * - Actividad reciente, métricas, etc.
 * 
 * Esta versión inicial muestra contenido simulado.
 */

const OverviewPanel = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Supervisión general</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 text-blue-900 p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total de entrenadores</h3>
                    <p className="text-3xl">12</p>
                </div>
                <div className="bg-green-100 text-green-900 p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Total de clientes</h3>
                    <p className="text-3xl">78</p>
                </div>
                <div className="bg-yellow-100 text-yellow-900 p-4 rounded shadow">
                    <h3 className="text-lg font-bold">Planes disponibles</h3>
                    <p className="text-3xl">6</p>
                </div>
            </div>
        </div>
    );
};

export default OverviewPanel; 