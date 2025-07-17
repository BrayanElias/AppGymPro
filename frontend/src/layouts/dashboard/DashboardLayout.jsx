import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
                <h2 className="text-2xl font-bold">Panel</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full"
                >
                    Cerrar sesión
                </button>
            </aside>

            {/* Contenido */}
            <main className="flex-1 bg-gray-100 p-6">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
