import { Navigate } from "react-router-dom";

// Componente para proteger rutas según el rol del usuario
const RoleRoute = ({ allowedRole, children }) => {
    // Obtener el token JWT almacenado en localStorage
    const token = localStorage.getItem("token");

    // Si no hay token, redirige al inicio (página de login o principal)
    if (!token) return <Navigate to="/" replace />;

    try {
        // Decodificar el token JWT para obtener el payload (segunda parte del token)
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Obtener el rol del usuario del payload
        const userRole = payload.role;

        // Si el rol del usuario no coincide con el rol permitido, redirige al inicio
        if (userRole !== allowedRole) {
            return <Navigate to="/unauthorized" replace />;
        }

        // Si el rol es válido, renderiza los hijos (contenido protegido)
        return children;
    } catch (error) {
        // Si ocurre un error al decodificar el token (token malformado), redirige al inicio
        console.error("Token inválido:", error);
        return <Navigate to="/" replace />;
    }
};

export default RoleRoute;
