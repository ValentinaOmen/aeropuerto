"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

function FormularioEditarAerolinea() {
    const [codaerolinea, setCodAerolinea] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/aerolineas/${id}`)
                .then(res => res.json())
                .then(data => {
                    setCodAerolinea(data.codaerolinea);
                    setDescripcion(data.descripcion);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { codaerolinea, descripcion };

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
                    <label className="block text-gray-700">Código de Aerolínea</label>
                    <input type="text" value={codaerolinea} onChange={(e) => setCodAerolinea(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Actualizar</button>
            </form>
        </div>
    );
}

export default FormularioEditarAerolinea;