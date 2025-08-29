
/**
 * @swagger
 * /api/pasajero/{id}:
 *   get:
 *     summary: Obtener un pasajero por ID
 *     description: Retorna un pasajero específico basado en su ID.
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del pasajero.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un pasajero.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pasajero'
 *   put:
 *     summary: Actualizar un pasajero
 *     description: Actualiza un pasajero existente con la información proporcionada.
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del pasajero.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pasajero'
 *     responses:
 *       200:
 *         description: Pasajero actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pasajero'
 *   delete:
 *     summary: Eliminar un pasajero
 *     description: Elimina un pasajero existente.
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del pasajero.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pasajero eliminado correctamente.
 */
import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request,{params}){
    const id= params.id;
        const pasajero = await prisma.pasajero.findUnique({
            where:{id:id}
    });
    return NextResponse.json(pasajero);
}

export async function PUT(request,{params}){
    const id = params.id;
        const json = await request.json();
        const pasajero = await prisma.pasajero.update({
            where:{id:id},
            data:{
                nombre: json.nombre,
                apellido: json.apellido,
                telefono: json.telefono,
                email: json.email,
                foto: json.foto,
                vueloId: json.vueloId
            }
        });
    return NextResponse.json(pasajero);
}

export async function DELETE(request,{params}){
    const id = params.id;
        await prisma.pasajero.delete({
            where:{id:id}
    });
    return NextResponse.json("pasajero eliminado correctamente");
}
