// src/pages/ForgotPasswordPage.jsx

import { useState } from "react";

/**
 * Página para solicitar el restablecimiento de contraseña.
 * El usuario ingresa su email y se envía un enlace por correo si existe en el sistema.
 */
const ForgotPasswordPage = () => {
    // Estado para el email y mensajes de feedback
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    /**
     * Envía el email al backend para generar un token de recuperación.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        if (!email.trim()) {
            setError("Por favor, ingresa un correo válido.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                setError(result.detail || "Error al enviar el correo.");
            } else {
                setMensaje(
                    "Si el correo está registrado, te enviaremos un enlace para restablecer tu contraseña."
                );
                setEmail("");
            }
        } catch (err) {
            setError("No se pudo conectar con el servidor.", err);
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
                <h2 className="text-2xl font-bold mb-4 text-center">
                    ¿Olvidaste tu contraseña?
                </h2>

                {/* Mensaje de éxito */}
                {mensaje && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
                        {mensaje}
                    </div>
                )}

                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* Campo de email */}
                <label htmlFor="email" className="block mb-2 font-medium">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-xl mb-4"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Botón de envío */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-xl text-white transition ${loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Enviando..." : "Enviar enlace"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
