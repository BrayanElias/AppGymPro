// src/pages/LoginPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/auth";
import { Typewriter } from "react-simple-typewriter";

/**
 * Página de login con diseño visual y animaciones.
 * Utiliza contexto de autenticación (AuthContext) para iniciar sesión.
 */
const LoginPage = () => {
  // Estado para los campos de formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  // Hook de autenticación para manejar el login
  const { login } = useAuth();

  /**
   * Maneja el envío del formulario
   * - Valida campos
   * - Llama a la función de login
   * - Redirige al dashboard según rol
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

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
    <div
      className="relative min-h-screen bg-fixed bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/fondo_login3.jpg')",
        backgroundColor: "#111",
      }}
    >
      {/* Capa oscura encima del fondo */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 container mx-auto px-6 py-6 lg:py-0 flex flex-col md:flex-row items-center justify-center min-h-screen gap-8">
        {/* Bloque izquierdo: motivacional */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-white space-y-3">
          <div className="max-w-md">
            <div className="flex flex-col items-center space-y-3 animate-fade-in-up">
              <img
                src="/logo_gym.png"
                alt="Logo"
                className="w-16 h-16 md:w-40 md:h-24 object-contain drop-shadow-lg"
              />
              <h1 className="text-4xl font-extrabold font-poppins text-center">
                PODER
              </h1>
            </div>

            <h2 className="text-4xl text-center font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-xl animate-fade-in-up delay-500 font-poppins uppercase">
              DISCIPLINA
            </h2>

            <h3 className="text-4xl text-center font-extrabold text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)] animate-fade-in-up delay-500 font-poppins uppercase">
              DETERMINACIÓN
            </h3>

            <p className="font-poppins text-center mt-6 text-lg md:text-xl leading-relaxed text-gray-200">
              Adéntrate en el esfuerzo donde cada repetición, cada gota de sudor,<br />
              te acerca a la versión más fuerte de ti mismo.
            </p>

            <div className="mt-4 text-center text-sm md:text-base italic min-h-[70px] flex items-center justify-center">
              <span className="text-yellow-400 block">
                <Typewriter
                  words={[
                    "Tu transformación física comienza ahora. ¡Hora de levantar!",
                    "Sin dolor no hay ganancia. ¡A darlo todo!",
                    "La disciplina es el puente entre las metas y los resultados.",
                    "Esfuérzate más que ayer si quieres un mañana diferente.",
                    "El éxito comienza con la confianza en uno mismo y el sudor.",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={50}
                  deleteSpeed={30}
                  delaySpeed={2500}
                />
              </span>
            </div>
          </div>
        </div>

        {/* Bloque derecho: formulario */}
        <div className="w-full md:w-1/3 min-w-[320px] flex justify-center items-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl border border-white border-opacity-20 max-w-md w-full shadow-2xl">
            <img
              src="/logo_mancuerna.png"
              alt="Gym Logo"
              className="mx-auto mb-6 w-28 md:w-32 h-auto transition-all duration-500 hover:scale-105"
            />

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-white text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white placeholder-opacity-70 text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-white text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white placeholder-opacity-70 text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Enlace de recuperación */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-white hover:text-blue-500 font-medium transition duration-200"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base font-semibold tracking-wider transition duration-300 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Entrando..." : "SIGN IN"}
              </button>
            </form>

            {/* Línea divisoria */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-white border-opacity-30"></div>
              <span className="mx-4 text-white text-opacity-70 text-sm">or</span>
              <div className="flex-grow border-t border-white border-opacity-30"></div>
            </div>

            {/* Enlace a registro */}
            <div className="text-center font-poppins">
              <span className="text-white text-sm text-opacity-80 mr-1">
                Are you new?
              </span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-white text-sm font-medium underline hover:text-opacity-100"
              >
                Create an account
              </button>
            </div>

            {/* Mensaje de error */}
            {error && (
              <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
