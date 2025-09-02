"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

function FormularioNuevaAerolinea() {
    const [codaerolinea, setCodAerolinea] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { codaerolinea, descripcion };

        await fetch('/api/aerolineas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        router.push('/gestionvuelos/aerolineas');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-lg">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Crear Aerolínea</h1>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300" onClick={() => router.push("/gestionvuelos/aerolineas")}>
                        ← Volver a Aerolíneas
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 py-10">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700">Código de Aerolínea</label>
                        <input type="text" value={codaerolinea} onChange={(e) => setCodAerolinea(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear</button>
                </form>
            </main>
        </div>
    );
}

export default FormularioNuevaAerolinea;