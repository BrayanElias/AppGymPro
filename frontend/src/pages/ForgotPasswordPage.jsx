import { useState } from "react";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        console.log("👉 Enviando a:", `${import.meta.env.VITE_API_URL}/auth/forgot-password`);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (!response.ok) {
                setError(result.detail || "Error al enviar el correo");
                return;
            }

            setMensaje("📧 Si el correo está registrado, te enviaremos un enlace para restablecer tu contraseña.");
            setEmail("");
        } catch (error) {
            setError("Error de conexión con el servidor: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">¿Olvidaste tu contraseña?</h2>

                {mensaje && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
                        {mensaje}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <label className="block mb-2 font-medium">Correo electrónico</label>
                <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-xl mb-4"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
                    Enviar enlace
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
