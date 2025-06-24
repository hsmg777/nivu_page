import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Página no encontrada</p>
      <Link to="/" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
        Volver al inicio
      </Link>
    </div>
  );
}
