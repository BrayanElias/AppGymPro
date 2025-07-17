/* eslint-disable react-refresh/only-export-components */
// src/context/auth/AuthContext.jsx

import { createContext, useContext } from "react";

// Contexto de autenticación que proveerá funciones y estado global
const AuthContext = createContext();

/**
 * Proveedor de autenticación que envuelve toda la aplicación
 * y proporciona funciones como login.
 */
export const AuthProvider = ({ children }) => {
    /**
     * Inicia sesión autenticando con email y contraseña.
     * Si es exitoso, guarda el token en localStorage y devuelve el rol.
     *
     * @param {string} email - Correo del usuario
     * @param {string} password - Contraseña del usuario
     * @returns {Object} { success: boolean, role?: string, message?: string }
     */
    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                mode: "cors",
            });

            if (!response.ok) {
                const errorData = await response.json();
                return { success: false, message: errorData.detail };
            }

            const { access_token: token } = await response.json();

            // Guardar el token en localStorage
            localStorage.setItem("token", token);

            // Decodificar el token JWT para obtener el rol del usuario
            const payloadBase64 = token.split(".")[1];
            const payload = JSON.parse(atob(payloadBase64));
            const role = payload.role;

            return { success: true, role };
        } catch (error) {
            return {
                success: false,
                message: "No se pudo conectar con el servidor.", error,
            };
        }
    };

    return (
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook personalizado para acceder al contexto de autenticación
 * desde cualquier componente.
 *
 * @returns {Object} Contiene funciones como login
 */
export const useAuth = () => useContext(AuthContext);
