
/**
 * @swagger
 * /api/vuelos/{id}:
 *   get:
 *     summary: Obtener un vuelo por ID
 *     description: Retorna un vuelo específico basado en su ID, incluyendo la aerolínea y el destino.
 *     tags: [Vuelos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del vuelo.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Un vuelo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vuelo'
 *   put:
 *     summary: Actualizar un vuelo
 *     description: Actualiza un vuelo existente con la información proporcionada.
 *     tags: [Vuelos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del vuelo.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vuelo'
 *     responses:
 *       200:
 *         description: Vuelo actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vuelo'
 *   delete:
 *     summary: Eliminar un vuelo
 *     description: Elimina un vuelo existente.
 *     tags: [Vuelos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del vuelo.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vuelo eliminado correctamente.
 */
import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request, { params } ) {
    const id = params.id; 

    const vuelo= await prisma.vuelo.findUnique({
        where:{id: id},
        include:{
            aerolinea: true,
            destino: true
        }
    });
    return NextResponse.json(vuelo);
}

export async function PUT(request,{params}) {
    const id = params.id;
    const json = await request.json();
    const vuelo = await prisma.vuelo.update({
        where:{id:id},
        data: {
            codvuelo: json.codvuelo,
            coddestino: json.coddestino,
            codaerolinea: json.codaerolinea,
            salaabordaje: json.salaabordaje,
            horasalida: json.horasalida,
            horallegada: json.horallegada
        }
    });
    return NextResponse.json(vuelo);
}

export async function DELETE(request,{params}) {
    const id = params.id;
    await prisma.vuelo.delete({
        where:{id:id}
    });
    return NextResponse.json("Vuelo eliminado correctamente");
}
