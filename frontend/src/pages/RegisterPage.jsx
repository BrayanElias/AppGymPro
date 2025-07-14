import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    role: "client" // rol oculto
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Registration failed");
            }

            setSuccess("Account created! Redirecting...");
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl border border-white border-opacity-20 w-full max-w-md shadow-2xl">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">Create an Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-white text-sm">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 bg-white bg-opacity-20 text-white border border-white border-opacity-40 rounded-lg placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-white text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 bg-white bg-opacity-20 text-white border border-white border-opacity-40 rounded-lg placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-semibold tracking-wider transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
                {success && <p className="text-green-400 text-sm mt-4 text-center">{success}</p>}

                <p className="text-white text-sm mt-6 text-center">
                    Already have an account?{" "}
                    <button onClick={() => navigate("/")} className="underline hover:text-blue-400">
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
