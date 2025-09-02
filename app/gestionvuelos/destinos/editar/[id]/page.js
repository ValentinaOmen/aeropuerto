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
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-lg">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Editar Destino</h1>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300" onClick={() => router.push("/gestionvuelos/destinos")}>
                        ← Volver a Destinos
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 py-10">
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
            </main>
        </div>
    );
}

export default FormularioEditarDestino;