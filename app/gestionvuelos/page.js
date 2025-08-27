"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [vuelos, setVuelos] = useState([]);

  useEffect(() => {
    const fetchVuelos = async () => {
      const res = await fetch("/api/vuelos");
      const data = await res.json();
      if (res.ok) {
        setVuelos(data);
      }
    };
    fetchVuelos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow p-4">
        <h1 className="text-lg font-semibold">Panel de Administración</h1>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cerrar Sesión
        </button>
      </header>

      <main className="p-6">
        {/* Navegación y botones */}
        <div className="flex justify-between items-center mb-4">
          <a href="#" className="text-blue-600 font-semibold">
            Gestión de Vuelos
          </a>
          <div className="space-x-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => router.push("/gestionvuelos/pasajero")}>
              Crear Pasajero +
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => router.push("/gestionvuelos/vuelos")}
            >
              Crear Vuelo +
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">COD VUELO</th>
                <th className="border px-4 py-2">DESTINO</th>
                <th className="border px-4 py-2">AEROLÍNEA</th>
                <th className="border px-4 py-2">SALA</th>
                <th className="border px-4 py-2">HORA SALIDA</th>
                <th className="border px-4 py-2">HORA LLEGADA</th>
                <th className="border px-4 py-2">TIEMPO DE VUELO</th>
                <th className="border px-4 py-2">EDITAR</th>
                <th className="border px-4 py-2">VER PASAJEROS</th>
              </tr>
            </thead>
            <tbody>
              {vuelos.map((vuelo) => (
                <tr key={vuelo.id_vuelo}>
                  <td className="border px-4 py-2">{vuelo.codvuelo}</td>
                  <td className="border px-4 py-2">{vuelo.destino.nombre}</td>
                  <td className="border px-4 py-2">{vuelo.aerolinea.nombre}</td>
                  <td className="border px-4 py-2">{vuelo.salaabordaje}</td>
                  <td className="border px-4 py-2">{vuelo.horasalida}</td>
                  <td className="border px-4 py-2">{vuelo.horallegada}</td>
                  <td className="border px-4 py-2">{vuelo.tiempo}</td>
                  <td className="border px-4 py-2 text-center">
                    <button 
                      className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                      onClick={() => router.push(`/gestionvuelos/editarvuelo?id=${vuelo.id_vuelo}`)}
                    >
                      Editar
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button 
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                      onClick={() => router.push(`/gestionvuelos/pasajerovuelo?id=${vuelo.id_vuelo}`)}
                    >
                      Pasajeros
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
