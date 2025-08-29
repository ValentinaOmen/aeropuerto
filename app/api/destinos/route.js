
/**
 * @swagger
 * /api/destinos:
 *   get:
 *     summary: Obtener todos los destinos
 *     description: Retorna una lista de todos los destinos.
 *     tags: [Destinos]
 *     responses:
 *       200:
 *         description: Una lista de destinos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Destino'
 *   post:
 *     summary: Crear un nuevo destino
 *     description: Crea un nuevo destino con la información proporcionada.
 *     tags: [Destinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Destino'
 *     responses:
 *       200:
 *         description: Destino creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Destino'
 */
import { NextResponse } from "next/server";
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(){
    const destinos = await prisma.destino.findMany();
    return NextResponse.json(destinos);
}

export async function POST(request) {
    const json = await request.json();
        const destino = await prisma.destino.create({
            data: {
                coddestino: json.coddestino,
                descripcion: json.descripcion
            }
    });
    return NextResponse.json(destino);
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Destino:
 *       type: object
 *       properties:
 *         coddestino:
 *           type: string
 *           description: "El código del destino"
 *         descripcion:
 *           type: string
 *           description: "La descripción del destino"
 *       required:
 *         - coddestino
 *         - descripcion
 */
