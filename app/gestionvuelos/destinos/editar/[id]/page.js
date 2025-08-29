"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

function FormularioEditarDestino() {
    const [coddestino, setCodDestino] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/destinos/${id}`)
                .then(res => res.json())
                .then(data => {
                    setCodDestino(data.coddestino);
                    setDescripcion(data.descripcion);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { coddestino, descripcion };

        await fetch(`/api/destinos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        router.push('/gestionvuelos/destinos');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Destino</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Código de Destino</label>
                    <input type="text" value={coddestino} onChange={(e) => setCodDestino(e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full p-2 border rounded"></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Actualizar</button>
            </form>
        </div>
    );
}

export default FormularioEditarDestino;