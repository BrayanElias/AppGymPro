// src/pages/admin/AssignmentsPanel.jsx

/**
 * Panel de asignaciones de clientes a entrenadores.
 * Aquí se podrá:
 * - Ver entrenadores disponibles
 * - Ver clientes sin asignar
 * - Asignar cliente a entrenador según especialidad/disponibilidad
 * 
 * Esta es una vista base de ejemplo.
 */

const AssignmentsPanel = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Asignaciones entrenador-cliente</h2>

            <p className="text-gray-600 mb-4">Aquí podrás asignar clientes a entrenadores según sus necesidades.</p>

            {/* Maqueta temporal */}
            <div className="bg-gray-100 p-4 rounded shadow">
                <p><strong>Entrenador:</strong> Laura Díaz</p>
                <p><strong>Clientes asignados:</strong> 5</p>
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Asignar nuevo cliente
                </button>
            </div>
        </div>
    );
};

export default AssignmentsPanel;
