"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FormularioNuevoPasajero() {
    const router = useRouter();
    const params = useSearchParams();
    const vueloId = params.get('vueloId');

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        foto: null,       // ahora es un File o string
        vueloId: vueloId || '',
    });
    const [previewUrl, setPreviewUrl] = useState(""); // para mostrar imagen

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !vueloId) {
            router.push('/');
            return;
        }
    }, [vueloId, router]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setForm({ ...form, foto: file });

            const url = URL.createObjectURL(file);
            setPreviewUrl(prev => {
                if (prev) URL.revokeObjectURL(prev);
                return url;
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        let fotoUrl = "";
        try {
            if (typeof form.foto === 'string') {
                // ya es una URL existente
                fotoUrl = form.foto;
            } else if (form.foto) {
                // subir archivo al backend
                const uploadForm = new FormData();
                uploadForm.append('file', form.foto);
                const upRes = await fetch('/api/upload', { method: 'POST', body: uploadForm });
                const upData = await upRes.json();
                if (!upRes.ok) throw new Error(upData?.error || 'Error subiendo imagen');
                fotoUrl = upData.url; // tu endpoint debe devolver { url: "https://..." }
            }
        } catch (err) {
            console.error("Error subiendo imagen:", err);
            fotoUrl = ""; // si falla, queda vacío
        }

        const payload = {
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            telefono: form.telefono,
            foto: fotoUrl,
            vueloId: form.vueloId
        };

        const res = await fetch(`/api/pasajero`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            router.push(`/gestionvuelos/vuelos/${vueloId}/pasajeros`);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100'>
            <header className='bg-white shadow-lg'>
                <div className='container mx-auto px-4 py-6 flex justify-between items-center'>
                    <h1 className='text-2xl font-bold text-gray-800'>Gestión de Pasajeros</h1>
                </div>
            </header>

            <main className='container mx-auto px-4 py-10'>
                <div className='bg-white p-8 rounded-lg shadow-md'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-xl font-semibold text-gray-700'>Crear Pasajero</h2>
                        <button
                            className='text-blue-600 hover:text-blue-800 font-semibold transition duration-300'
                            onClick={() => router.push(`/gestionvuelos/vuelos/${vueloId}/pasajeros`)}
                        >
                            ← Volver
                        </button>
                    </div>

                    {/* Vista previa de imagen */}
                    <div className="flex justify-center mb-6">
                        <img 
                            src={previewUrl || '/placeholder-user.png'} 
                            alt="Foto pasajero" 
                            className="w-32 h-32 object-cover rounded-full border" 
                        />
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
                                <input
                                    type='text'
                                    name='nombre'
                                    value={form.nombre}
                                    onChange={onChange}
                                    placeholder='Ej: Juan'
                                    required
                                    className='shadow-sm border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Apellido</label>
                                <input
                                    type='text'
                                    name='apellido'
                                    value={form.apellido}
                                    onChange={onChange}
                                    placeholder='Ej: Perez'
                                    required
                                    className='shadow-sm border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={form.email}
                                    onChange={onChange}
                                    placeholder='Ej: juan.perez@example.com'
                                    required
                                    className='shadow-sm border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Teléfono</label>
                                <input
                                    type='text'
                                    name='telefono'
                                    value={form.telefono}
                                    onChange={onChange}
                                    placeholder='Ej: 3001234567'
                                    required
                                    className='shadow-sm border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            {/* Campo archivo */}
                            <div className='md:col-span-2'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Foto</label>
                                <input
                                    id="foto-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    className='shadow-sm border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        </div>

                        <div className='mt-8 flex justify-end'>
                            <button
                                type='submit'
                                className='bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300'
                            >
                                Guardar Pasajero
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
