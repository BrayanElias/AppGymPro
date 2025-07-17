// src/pages/admin/AssignmentsPanel.jsx

/**
 * Panel de asignaciones de clientes a entrenadores.
 * Aquí se podrá:
 * - Ver entrenadores disponibles
 * - Ver clientes sin asignar
 * - Asignar cliente a entrenador según especialidad/disponibilidad
 */


const AssignmentsPanel = () => {
    // Datos de ejemplo temporales
    const trainers = [
        { id: 1, name: "Laura Díaz" },
        { id: 2, name: "Carlos Pérez" },
    ];

    const clients = [
        { id: 1, name: "Ana Torres" },
        { id: 2, name: "Luis Gómez" },
    ];

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
                Asignaciones entrenador-cliente
            </h2>

            <p className="text-gray-600">
                Aquí podrás asignar clientes a entrenadores según sus necesidades.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Lista de entrenadores */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Entrenadores disponibles</h3>
                    <ul className="space-y-2">
                        {trainers.map((trainer) => (
                            <li key={trainer.id} className="p-3 bg-blue-50 rounded-lg">
                                <strong>{trainer.name}</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Lista de clientes */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Clientes sin asignar</h3>
                    <ul className="space-y-2">
                        {clients.map((client) => (
                            <li key={client.id} className="p-3 bg-green-50 rounded-lg">
                                <strong>{client.name}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Área de asignaciones futuras */}
            <div className="bg-gray-100 rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Asignaciones realizadas</h3>
                <p className="text-gray-600 italic">Aquí aparecerán las asignaciones hechas.</p>
            </div>
        </div>
    );
};

export default AssignmentsPanel;
