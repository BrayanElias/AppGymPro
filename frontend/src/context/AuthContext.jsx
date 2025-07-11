/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

// Crear contexto
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {

    // Función para hacer login
    const login = async (email, password) => {
        try {
            console.log("Llamando a backend con:", email, password); // ✅ DEBUG

            const response = await fetch("https://appgympro.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }) // El backend detecta el rol
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error en login:", errorData); // ✅ DEBUG
                return { success: false, message: errorData.detail };
            }

            const data = await response.json();
            const token = data.access_token;

            console.log("Token recibido:", data.access_token); // ✅ DEBUG


            // Decodificar el JWT para extraer el rol
            const payloadBase64 = token.split(".")[1];
            const payload = JSON.parse(atob(payloadBase64));
            const role = payload.role;

            // Guardar el token en localStorage
            localStorage.setItem("token", token);

            return { success: true, role };
        } catch (error) {
            console.log("Error de red:", error); // ✅ DEBUG
            return { success: false, message: "Error de conexión con el servidor.", error };
        }
    };

    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
