import { useState, useEffect } from "react";

/**
 * Modal reutilizable para crear o editar un entrenador.
 *
 * Props:
 * - mode: "create" | "edit"
 * - trainer: objeto trainer a editar (solo para modo "edit")
 * - onClose: función para cerrar el modal
 * - onTrainerSaved: callback para actualizar la lista de entrenadores
 */
const TrainerModal = ({ mode = "create", trainer = null, onClose, onTrainerSaved }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (mode === "edit" && trainer) {
      setEmail(trainer.email || "");
      setName(trainer.name || "");
      setPhone(trainer.phone || "");
      setSpecialty(trainer.specialty || "");
    }
  }, [mode, trainer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");

    try {
      const url =
        mode === "edit"
          ? `${import.meta.env.VITE_API_URL}/admin/trainers/${trainer.id}`
          : `${import.meta.env.VITE_API_URL}/admin/trainers`;

      const method = mode === "edit" ? "PUT" : "POST";

      const body = {
        email,
        name,
        phone,
        specialty,
      };

      if (password) body.password = password; // Solo se envía si se ingresó

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Ocurrió un error");

      setSuccess("Entrenador guardado correctamente");

      setTimeout(() => {
        onTrainerSaved();
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-semibold mb-4">
          {mode === "edit" ? "Editar Entrenador" : "Nuevo Entrenador"}
        </h3>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Teléfono</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Especialidad</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "edit" ? "Nueva contraseña (opcional)" : ""}
              required={mode !== "edit"}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {mode === "edit" ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerModal;
