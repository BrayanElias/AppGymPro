// src/pages/ResetPasswordPage.jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, new_password: newPassword }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.detail || "Hubo un error");
                return;
            }

            setMensaje("✅ Contraseña restablecida con éxito. Ahora puedes iniciar sesión.");
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setError("Error al conectar con el servidor: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Restablecer contraseña</h2>

                {mensaje && <p className="text-green-600 text-sm mb-4">{mensaje}</p>}
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <label className="block mb-2 font-medium">Nueva contraseña</label>
                <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-xl mb-4"
                    placeholder="Escribe tu nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
                    Cambiar contraseña
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
