"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DestinosPage() {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchDestinos = async () => {
      try {
        const res = await fetch("/api/destinos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener los destinos");
        const data = await res.json();
        setDestinos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinos();
  }, [router]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("¿Seguro que quieres eliminar este destino?")) {
      try {
        const res = await fetch(`/api/destinos/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al eliminar el destino");
        setDestinos(destinos.filter((d) => d.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Destinos</h1>
          <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300" onClick={() => router.push("/gestionvuelos/vuelos")}>
            ← Volver a Vuelos
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-end mb-6">
          <button onClick={() => router.push("/gestionvuelos/destinos/crear")} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Crear Destino
          </button>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Lista de Destinos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Código</th>
                  <th className="py-3 px-6 text-left">Descripción</th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {destinos.map((d) => (
                  <tr key={d.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{d.coddestino}</td>
                    <td className="py-3 px-6 text-left">{d.descripcion}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <button onClick={() => router.push(`/gestionvuelos/destinos/editar/${d.id}`)} className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded-full">
                          Editar
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full">
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
