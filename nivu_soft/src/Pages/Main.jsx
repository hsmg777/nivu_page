import Navbar from "../components/Navbar";

function Main() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Servicios de NivuSoft 🚀
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Servicio</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr>
                <td className="px-6 py-4 font-medium">Landing Page</td>
                <td className="px-6 py-4">Página informativa responsiva y moderna</td>
                <td className="px-6 py-4">$80</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium">Sistema Web</td>
                <td className="px-6 py-4">CRUD, autenticación, base de datos</td>
                <td className="px-6 py-4">$250</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Mantenimiento</td>
                <td className="px-6 py-4">Mejoras y soporte técnico mensual</td>
                <td className="px-6 py-4">$30/mes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Main;
