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
        foto: '',
        vueloId: vueloId || '',
    });

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
                        foto: data.foto || '',
                        vueloId: data.vueloId || vueloId,
                    });
                }
            };
            fetchPasajero();
        }
    }, [id, vueloId, router]);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/pasajero/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            console.log({ vueloId, redirectPath: `/gestionvuelos/vuelos/${vueloId}/pasajeros` });
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
                                    className='shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                                    className='shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                                    className='shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div>w
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Teléfono</label>
                                <input
                                    type='text'
                                    name='telefono'
                                    value={form.telefono}
                                    onChange={onChange}
                                    placeholder='Ej: 3001234567'
                                    required
                                    className='shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div className='md:col-span-2'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Foto (URL)</label>
                                <input
                                    type='text'
                                    name='foto'
                                    value={form.foto}
                                    onChange={onChange}
                                    placeholder='Ej: https://example.com/foto.jpg'
                                    required
                                    className='shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        </div>

                        <div className='mt-8 flex justify-end'>
                            <button
                                type='submit'
                                className='bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300'
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