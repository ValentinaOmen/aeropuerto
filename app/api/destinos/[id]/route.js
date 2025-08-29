
/**
 * @swagger
 * /api/destinos/{id}:
 *   get:
 *     summary: Obtener un destino por ID
 *     description: Retorna un destino específico basado en su ID.
 *     tags: [Destinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del destino.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un destino.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destino'
 *   put:
 *     summary: Actualizar un destino
 *     description: Actualiza un destino existente con la información proporcionada.
 *     tags: [Destinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del destino.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destino'
 *     responses:
 *       200:
 *         description: Destino actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destino'
 *   delete:
 *     summary: Eliminar un destino
 *     description: Elimina un destino existente.
 *     tags: [Destinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del destino.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Destino eliminado correctamente.
 */
import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request,{params}){
    const id= params.id;
        const destino = await prisma.destino.findUnique({
            where:{id:id}
    });
    return NextResponse.json(destino);
}

export async function PUT(request,{params}){
    const id = params.id;
        const json = await request.json();
        const destino = await prisma.destino.update({
            where:{id:id},
            data:{
                coddestino: json.coddestino,
                descripcion: json.descripcion
            }
        });
    return NextResponse.json(destino);
}

export async function DELETE(request,{params}){
    const id = params.id;
        await prisma.destino.delete({
            where:{id:id}
    });
    return NextResponse.json("Destino eliminado correctamente");
}
