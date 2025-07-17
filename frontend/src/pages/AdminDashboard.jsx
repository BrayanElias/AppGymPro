import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg">Bienvenido, {user?.email}</p>

      {/* Aquí puedes agregar secciones como: */}
      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="bg-gray-800 p-4 rounded-lg shadow">Total Entrenadores</div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">Total Clientes</div>
        <div className="bg-gray-800 p-4 rounded-lg shadow">Planes de entrenamiento</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
