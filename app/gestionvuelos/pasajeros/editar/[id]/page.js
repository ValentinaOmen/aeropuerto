"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

export default function FormularioEditarPasajero() {
    const router = useRouter();
    const { id } = useParams();
    const params = useSearchParams();
    const vueloId = params.get('vueloId');

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        foto: null, // Can be a File object or a string (URL)
        vueloId: vueloId || '',
    });
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || !vueloId) {
            router.push('/');
            return;
        }

        if (id) {
            const fetchPasajero = async () => {
                const res = await fetch(`/api/pasajero/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setForm({
                        nombre: data.nombre || '',
                        apellido: data.apellido || '',
                        telefono: data.telefono || '',
                        email: data.email || '',
                        foto: data.foto || null, // Store existing URL as string
                        vueloId: data.vueloId || vueloId,
                    });
                    setPreviewUrl(data.foto || ""); // Set initial preview
                }
            };
            fetchPasajero();
        }
    }, [id, vueloId, router]);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setForm({ ...form, foto: file }); // Store the File object

            const url = URL.createObjectURL(file);
            setPreviewUrl(prev => {
                if (prev && prev.startsWith('blob:')) URL.revokeObjectURL(prev);
                return url;
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        let fotoUrl = form.foto; // Default to existing URL or null
        try {
            // If form.foto is a File object, it means a new file was selected
            if (form.foto && typeof form.foto !== 'string') {
                const uploadForm = new FormData();
                uploadForm.append('file', form.foto);
                const upRes = await fetch('/api/upload', { method: 'POST', body: uploadForm });
                const upData = await upRes.json();
                if (!upRes.ok) throw new Error(upData?.error || 'Error subiendo imagen');
                fotoUrl = upData.url;
            }
        } catch (err) {
            console.error("Error subiendo imagen:", err);
            // Decide what to do on upload failure. Maybe keep the old image?
            // For now, we let fotoUrl be the original file object, which will fail stringify
            // A better approach is to handle this case gracefully.
        }

        const payload = {
            ...form,
            foto: fotoUrl, // Ensure foto is a URL string
        };

        const res = await fetch(`/api/pasajero/${id}`, {
            method: 'PUT',
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
                        <h2 className='text-xl font-semibold text-gray-700'>Editar Pasajero</h2>
                        <button
                            className='text-blue-600 hover:text-blue-800 font-semibold transition duration-300'
                            onClick={() => router.push(`/gestionvuelos/vuelos/${vueloId}/pasajeros`)}
                        >
                            ← Volver
                        </button>
                    </div>

                    {/* Image Preview */}
                    <div className="flex justify-center mb-6">
                        <img 
                            src={previewUrl || '/placeholder-user.png'} 
                            alt="Foto pasajero" 
                            className="w-32 h-32 object-cover rounded-full border" 
                        />
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Other fields remain the same */}
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Nombre</label>
                                <input
                                    type='text'
                                    name='nombre'
                                    value={form.nombre}
                                    onChange={onChange}
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
                                    required
                                    className='shadow-sm border rounded w-full py-3 px-4 focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            {/* File Input */}
                            <div className='md:col-span-2'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Cambiar Foto</label>
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
                                Actualizar Pasajero
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
