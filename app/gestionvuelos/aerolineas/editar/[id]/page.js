"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

function FormularioEditarAerolinea() {
    const [nombre, setNombre] = useState('');
    const [paisOrigen, setPaisOrigen] = useState('');
    const [fechaFundacion, setFechaFundacion] = useState('');
    const [sitioWeb, setSitioWeb] = useState('');
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/aerolineas/${id}`)
                .then(res => res.json())
                .then(data => {
                    setNombre(data.nombre);
                    setPaisOrigen(data.pais_origen);
                    setFechaFundacion(data.fecha_fundacion);
                    setSitioWeb(data.sitio_web);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { nombre, pais_origen: paisOrigen, fecha_fundacion: fechaFundacion, sitio_web: sitioWeb };

        await fetch(`/api/aerolineas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        router.push('/gestionvuelos/aerolineas');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Aerolínea</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">País de Origen</label>
                    <input type="text" value={paisOrigen} onChange={(e) => setPaisOrigen(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de Fundación</label>
                    <input type="date" value={fechaFundacion} onChange={(e) => setFechaFundacion(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Sitio Web</label>
                    <input type="url" value={sitioWeb} onChange={(e) => setSitioWeb(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Actualizar</button>
            </form>
        </div>
    );
}

export default FormularioEditarAerolinea;