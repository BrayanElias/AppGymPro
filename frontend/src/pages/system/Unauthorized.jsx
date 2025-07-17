import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso denegado</h1>
            <p className="text-lg text-gray-700 mb-2">
                No tienes permiso para acceder a esta página.
            </p>
            <p className="text-sm text-gray-500 mb-6">
                ¿Entraste con la cuenta incorrecta?
            </p>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
                Cerrar sesión y volver al inicio
            </button>
        </div>
    );
};

export default Unauthorized;
