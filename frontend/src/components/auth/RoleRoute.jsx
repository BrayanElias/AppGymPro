// src/components/auth/RoleRoute.jsx

import { Navigate } from "react-router-dom";

/**
 * RoleRoute
 * 
 * Componente de protección de rutas basado en el rol del usuario.
 * Solo permite el acceso a los componentes hijos si el usuario tiene el rol requerido.
 *
 * @param {string} allowedRole - Rol permitido (por ejemplo: "admin", "trainer", "client")
 * @param {ReactNode} children - Componente(s) hijo que se deben renderizar si el rol es válido
 * @returns {JSX.Element} - Renderiza los hijos si el usuario tiene acceso, o redirige si no
 */
const RoleRoute = ({ allowedRole, children }) => {
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem("token");

    // Si no hay token (usuario no autenticado), redirigir al login
    if (!token) return <Navigate to="/" replace />;

    try {
        // Decodificamos el payload del JWT (la segunda parte del token)
        const payloadBase64 = token.split(".")[1];
        const payload = JSON.parse(atob(payloadBase64));

        // Obtener el rol del usuario del payload
        const userRole = payload.role;

        // Si el rol no coincide con el permitido, redirigimos a "no autorizado"
        if (userRole !== allowedRole) {
            console.warn(
                "Acceso denegado → Rol actual:",
                userRole,
                "| Rol requerido:",
                allowedRole
            );
            return <Navigate to="/unauthorized" replace />;
        }

        // ✅ Si el rol es correcto, renderizamos la ruta protegida
        return children;
    } catch (error) {
        // Si el token está mal formado o no se puede decodificar
        console.error("Token inválido o malformado:", error);
        return <Navigate to="/" replace />;
    }
};

export default RoleRoute;
