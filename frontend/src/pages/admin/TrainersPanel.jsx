// src/pages/admin/TrainersPanel.jsx

import { useEffect, useState } from "react";
import TrainerModal from "./TrainerModal";

/**
 * Panel del administrador para gestionar entrenadores.
 * Permite crear, editar y eliminar entrenadores desde la UI.
 */
const TrainersPanel = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedTrainer, setSelectedTrainer] = useState(null);

    // 🔄 Obtener lista de entrenadores
    const fetchTrainers = async () => {
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/trainers`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Error al obtener entrenadores");
            }

            setTrainers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    // 🔥 Eliminar entrenador con confirmación
    const handleDelete = async (id) => {
        const confirmed = confirm("¿Estás seguro de eliminar este entrenador?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/trainers/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || "No se pudo eliminar");
            }

            fetchTrainers();
        } catch (err) {
            alert("Error eliminando entrenador: " + err.message);
        }
    };

    // 🧠 Abrir modal para crear o editar
    const openModal = (mode, trainer = null) => {
        setModalMode(mode);
        setSelectedTrainer(trainer);
        setShowModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Encabezado y botón para crear */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Entrenadores</h2>
                <button
                    onClick={() => openModal("create")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + Agregar Entrenador
                </button>
            </div>

            {/* Estado de carga o errores */}
            {error && <p className="text-red-600">{error}</p>}
            {loading ? (
                <p>Cargando entrenadores...</p>
            ) : trainers.length === 0 ? (
                <p>No hay entrenadores registrados.</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trainers.map((trainer) => (
                        <li key={trainer.id} className="p-4 border rounded shadow bg-white space-y-2">
                            <p><strong>ID:</strong> {trainer.id}</p>
                            <p><strong>Email:</strong> {trainer.email}</p>
                            <p><strong>Nombre:</strong> {trainer.name}</p>
                            <p><strong>Especialidad:</strong> {trainer.specialty}</p>
                            <p><strong>Teléfono:</strong> {trainer.phone}</p>
                            <p><strong>Rol:</strong> {trainer.role}</p>

                            {/* Botones de acción */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openModal("edit", trainer)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(trainer.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            )}

            {/* Modal */}
            {showModal && (
                <TrainerModal
                    mode={modalMode}
                    trainer={selectedTrainer}
                    onClose={() => setShowModal(false)}
                    onTrainerSaved={fetchTrainers}
                />
            )}
        </div>
    );
};

export default TrainersPanel;
