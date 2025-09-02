"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function FormularioNuevoVuelo() {
    const [codvuelo, setCodVuelo] = useState('');
    const [coddestino, setCodDestino] = useState('');
    const [codaerolinea, setCodAerolinea] = useState('');
    const [salaabordaje, setSalaAbordaje] = useState('');
    const [horasalida, setHoraSalida] = useState('');
    const [horallegada, setHoraLlegada] = useState('');
    
    const [destinos, setDestinos] = useState([]);
    const [aerolineas, setAerolineas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/destinos')
            .then(res => res.json())
            .then(data => setDestinos(data));
        
        fetch('/api/aerolineas')
            .then(res => res.json())
            .then(data => setAerolineas(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            codvuelo,
            coddestino,
            codaerolinea,
            salaabordaje,
            horasalida,
            horallegada
        };

        await fetch('/api/vuelos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        router.push('/gestionvuelos/vuelos');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-lg">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Crear Vuelo</h1>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300" onClick={() => router.push("/gestionvuelos/vuelos")}>
                        ← Volver a Vuelos
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 py-10">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700">Código de Vuelo</label>
                        <input type="text" value={codvuelo} onChange={(e) => setCodVuelo(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Destino</label>
                        <select value={coddestino} onChange={(e) => setCodDestino(e.target.value)} className="w-full p-2 border rounded" required>
                            <option value="">Seleccione un destino</option>
                            {destinos.map(d => (
                                <option key={d.id} value={d.id}>{d.descripcion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Aerolínea</label>
                        <select value={codaerolinea} onChange={(e) => setCodAerolinea(e.target.value)} className="w-full p-2 border rounded" required>
                            <option value="">Seleccione una aerolínea</option>
                            {aerolineas.map(a => (
                                <option key={a.id} value={a.id}>{a.descripcion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Sala de Abordaje</label>
                        <input type="text" value={salaabordaje} onChange={(e) => setSalaAbordaje(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Hora de Salida</label>
                        <input type="datetime-local" value={horasalida} onChange={(e) => setHoraSalida(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Hora de Llegada</label>
                        <input type="datetime-local" value={horallegada} onChange={(e) => setHoraLlegada(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear</button>
                </form>
            </main>
        </div>
    );
}

export default FormularioNuevoVuelo;
