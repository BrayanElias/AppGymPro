const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-lg text-gray-700 mb-4">Página no encontrada</p>
            <a
                href="/"
                className="text-blue-500 underline hover:text-blue-700"
            >
                Volver al inicio
            </a>
        </div>
    );
};

export default NotFound;
