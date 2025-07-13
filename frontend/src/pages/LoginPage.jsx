import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await login(email, password);
        if (result.success) {
            const role = result.role;
            if (role === "admin") navigate("/admin/dashboard");
            else if (role === "trainer") navigate("/trainer/dashboard");
            else if (role === "client") navigate("/client/me");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => navigate("/forgot-password")}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                {error && (
                    <div className="mt-4 text-red-500 text-sm text-center">
                        {Array.isArray(error)
                            ? error.map((e, i) => <p key={i}>{e.msg}</p>)
                            : <p>{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
