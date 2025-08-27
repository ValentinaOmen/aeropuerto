"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function FormularioNuevoVuelo() {
    const [numeroVuelo, setNumeroVuelo] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const [aerolineaId, setAerolineaId] = useState('');
    const [aerolineas, setAerolineas] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const router = useRouter();

    useEffect(() => {
        fetch('/api/aerolineas')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch airlines');
                }
                return res.json();
            })
            .then(data => {
                setAerolineas(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            numero_vuelo: numeroVuelo,
            origen,
            destino,
            fecha_salida: new Date(fechaSalida).toISOString(),
            hora_salida: horaSalida,
            aerolinea_id: parseInt(aerolineaId)
        };

        await fetch('/api/vuelos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        router.push('/gestionvuelos/vuelos');
    };

    if (loading) {
        return <p>Cargando formulario...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Crear Vuelo</h1>
                <button
                    onClick={() => router.push('/gestionvuelos/vuelos')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                    ← Volver
                </button>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                {/* Form fields */}
                <div className="mb-4">
                    <label className="block text-gray-700">Número de Vuelo</label>
                    <input type="text" value={numeroVuelo} onChange={(e) => setNumeroVuelo(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Origen</label>
                    <input type="text" value={origen} onChange={(e) => setOrigen(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Destino</label>
                    <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de Salida</label>
                    <input type="date" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Hora de Salida</label>
                    <input type="time" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Aerolínea</label>
                    <select value={aerolineaId} onChange={(e) => setAerolineaId(e.target.value)} className="w-full p-2 border rounded" required>
                        <option value="">Seleccione una aerolínea</option>
                        {aerolineas.map(a => (
                            <option key={a.id} value={a.id}>{a.nombre}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear</button>
            </form>
        </div>
    );
}

export default FormularioNuevoVuelo;