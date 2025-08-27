"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

function PasajerosVuelo() {
    const [pasajeros, setPasajeros] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/vuelos/${id}/pasajeros`)
                .then(res => res.ok ? res.json() : [])
                .then(data => {
                    setPasajeros(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);

    const handleDelete = async (pasajeroId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este pasajero?')) {
            await fetch(`/api/pasajero/${pasajeroId}`, { method: 'DELETE' });
            setPasajeros(pasajeros.filter(p => p.id !== pasajeroId));
        }
    };

    if (loading) {
        return <p className="text-black">Cargando pasajeros...</p>;
    }

    return (
        <div className="bg-white text-black min-h-screen"> {/* 👈 fondo blanco + texto negro */}
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-black">Pasajeros del Vuelo</h1>
                    <button
                        onClick={() => router.push('/gestionvuelos/vuelos')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    >
                        ← Volver
                    </button>
                </div>
                <Link 
                    href={`/gestionvuelos/pasajeros/crear?vueloId=${id}`} 
                    className="bg-blue-500 text-white p-2 rounded mb-4 inline-block"
                >
                    Crear Pasajero
                </Link>
                <ul className="bg-white p-6 rounded-lg shadow-md">
                    {pasajeros.map(p => (
                        <li key={p.id} className="border-b py-2 flex justify-between items-center">
                            <div>
                                <h2 className="font-bold">{p.nombre} {p.apellido}</h2>
                                <p>{p.email} - {p.telefono}</p>
                            </div>
                            <div>
                                <Link 
                                    href={`/gestionvuelos/pasajeros/editar/${p.id}?vueloId=${id}`} 
                                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                                >
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleDelete(p.id)} 
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PasajerosVuelo;
