// src/pages/auth/RegisterPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Página de registro de nuevos usuarios (rol: client por defecto).
 */
const RegisterPage = () => {
    // Estado local para formulario y mensajes
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    /**
     * Envía los datos al backend para registrar al usuario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    role: "client", // El rol se fuerza en backend, pero lo mandamos por claridad
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "No se pudo completar el registro.");
            }

            setSuccess("Cuenta creada exitosamente. Redirigiendo al login...");
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl border border-white border-opacity-20 w-full max-w-md shadow-2xl">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Crear una cuenta
                </h2>

                {/* Formulario de registro */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo de email */}
                    <div>
                        <label htmlFor="email" className="text-white text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 mt-1 bg-white bg-opacity-20 text-white border border-white border-opacity-40 rounded-lg placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    {/* Campo de contraseña */}
                    <div>
                        <label htmlFor="password" className="text-white text-sm">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-2 mt-1 bg-white bg-opacity-20 text-white border border-white border-opacity-40 rounded-lg placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    {/* Botón de registro */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-semibold tracking-wider transition duration-300"
                    >
                        Registrarse
                    </button>
                </form>

                {/* Mensajes de error o éxito */}
                {error && (
                    <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
                )}
                {success && (
                    <p className="text-green-400 text-sm mt-4 text-center">{success}</p>
                )}

                {/* Enlace para usuarios que ya tienen cuenta */}
                <p className="text-white text-sm mt-6 text-center">
                    ¿Ya tienes una cuenta?{" "}
                    <button
                        onClick={() => navigate("/")}
                        className="underline hover:text-blue-400"
                    >
                        Iniciar sesión
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
