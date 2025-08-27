'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VuelosPage() {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const fetchVuelos = async () => {
      try {
        const res = await fetch('/api/vuelos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Error al obtener los vuelos');
        }
        const data = await res.json();
        setVuelos(data);
      } catch (error) {
        console.error(error);
        // Opcional: redirigir o mostrar mensaje de error
      } finally {
        setLoading(false);
      }
    };

    fetchVuelos();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('¿Estás seguro de que quieres eliminar este vuelo?')) {
      try {
        const res = await fetch(`/api/vuelos/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Error al eliminar el vuelo');
        }
        setVuelos(vuelos.filter((vuelo) => vuelo.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración de Vuelos</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-end mb-6 space-x-4">
          <button
            onClick={() => router.push('/gestionvuelos/aerolineas')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Gestionar Aerolíneas
          </button>
          <button
            onClick={() => router.push('/gestionvuelos/destinos')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Gestionar Destinos
          </button>
          <button
            onClick={() => router.push('/gestionvuelos/vuelos/crear')}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Crear Vuelo
          </button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Lista de Vuelos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Código Vuelo</th>
                  <th className="py-3 px-6 text-left">Destino</th>
                  <th className="py-3 px-6 text-left">Aerolínea</th>
                  <th className="py-3 px-6 text-center">Sala</th>
                  <th className="py-3 px-6 text-center">Salida</th>
                  <th className="py-3 px-6 text-center">Llegada</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {vuelos.map((vuelo) => (
                  <tr key={vuelo.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{vuelo.codvuelo}</td>
                    <td className="py-3 px-6 text-left">{vuelo.destino.descripcion}</td>
                    <td className="py-3 px-6 text-left">{vuelo.aerolinea.descripcion}</td>
                    <td className="py-3 px-6 text-center">{vuelo.salaabordaje}</td>
                    <td className="py-3 px-6 text-center">{vuelo.horasalida}</td>
                    <td className="py-3 px-6 text-center">{vuelo.horallegada}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <button
                          onClick={() => router.push(`/gestionvuelos/vuelos/${vuelo.id}/pasajeros`)}
                          className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-full"
                        >
                          Pasajeros
                        </button>
                        <button
                          onClick={() => router.push(`/gestionvuelos/vuelos/editar/${vuelo.id}`)}
                          className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded-full"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(vuelo.id)}
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
