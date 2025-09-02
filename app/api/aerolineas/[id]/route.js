
/**
 * @swagger
 * /api/aerolineas/{id}:
 *   get:
 *     summary: Obtener una aerolínea por ID
 *     description: Retorna una aerolínea específica basada en su ID.
 *     tags: [Aerolineas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID de la aerolínea.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Una aerolínea.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aerolinea'
 *   put:
 *     summary: Actualizar una aerolínea
 *     description: Actualiza una aerolínea existente con la información proporcionada.
 *     tags: [Aerolineas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID de la aerolínea.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aerolinea'
 *     responses:
 *       200:
 *         description: Aerolínea actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aerolinea'
 *   delete:
 *     summary: Eliminar una aerolínea
 *     description: Elimina una aerolínea existente.
 *     tags: [Aerolineas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID de la aerolínea.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aerolínea eliminada correctamente.
 */
import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const id = params.id;

        const aerolinea = await prisma.aerolinea.findUnique({
            where: { id: id }
        });
   return NextResponse.json(aerolinea);
}


export async function PUT(request, { params }){
    const id = params.id;

        const json = await request.json();
        const aerolinea = await prisma.aerolinea.update({
            where:{id: id},
            data:{
                codaerolinea: json.codaerolinea,
                descripcion: json.descripcion
            }
        });
    return NextResponse.json(aerolinea);
}

export async function DELETE(request,{ params}){
    const id = params.id;
    await prisma.aerolinea.delete({
        where:{id:id}
    });
    return NextResponse.json("Aerolinea eliminada correctamente");
}