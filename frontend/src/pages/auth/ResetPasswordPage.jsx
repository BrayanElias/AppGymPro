// src/pages/ResetPasswordPage.jsx

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * Página para que el usuario restablezca su contraseña usando un token.
 * El token llega como parámetro en la URL desde el enlace enviado por correo.
 */
const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Token de recuperación extraído de la URL
    const token = searchParams.get("token");

    // Estado del formulario
    const [newPassword, setNewPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    /**
     * Si no hay token en la URL, redirigimos al login
     */
    useEffect(() => {
        if (!token) {
            setError("Token inválido o ausente.");
            setTimeout(() => navigate("/"), 3000);
        }
    }, [token, navigate]);

    /**
     * Envía la nueva contraseña al backend junto con el token.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        if (newPassword.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, new_password: newPassword }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.detail || "No se pudo cambiar la contraseña.");
            } else {
                setMensaje("Contraseña restablecida con éxito. Redirigiendo al login...");
                setTimeout(() => navigate("/"), 3000);
            }
        } catch (err) {
            setError("No se pudo conectar con el servidor.",err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Restablecer contraseña</h2>

                {/* Mensajes de feedback */}
                {mensaje && (
                    <p className="text-green-600 text-sm mb-4">{mensaje}</p>
                )}

                {error && (
                    <p className="text-red-600 text-sm mb-4">{error}</p>
                )}

                {/* Campo para nueva contraseña */}
                <label htmlFor="password" className="block mb-2 font-medium">
                    Nueva contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full px-4 py-2 border rounded-xl mb-4"
                    placeholder="Escribe tu nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                {/* Botón de confirmación */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-xl text-white transition ${loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Procesando..." : "Cambiar contraseña"}
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
