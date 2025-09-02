
/**
 * @swagger
 * /api/aerolineas:
 *   get:
 *     summary: Obtener todas las aerolíneas
 *     description: Retorna una lista de todas las aerolíneas.
 *     tags: [Aerolineas]
 *     responses:
 *       200:
 *         description: Una lista de aerolíneas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aerolinea'
 *   post:
 *     summary: Crear una nueva aerolínea
 *     description: Crea una nueva aerolínea con la información proporcionada.
 *     tags: [Aerolineas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aerolinea'
 *     responses:
 *       200:
 *         description: Aerolínea creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */

import { NextResponse } from "next/server";
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(){
    const aerolineas = await prisma.aerolinea.findMany();
    return NextResponse.json(aerolineas);
}

export async function POST(request) {
    const json = await request.json();    
    const aerolinea = await prisma.aerolinea.create({
        data: { 
            codaerolinea: json.codaerolinea,
            descripcion: json.descripcion
        }
    });
    return NextResponse.json({success: true});
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Aerolinea:
 *       type: object
 *       properties:
 *         codaerolinea:
 *           type: string
 *           description: "El código de la aerolínea"
 *         descripcion:
 *           type: string
 *           description: "La descripción de la aerolínea"
 *       required:
 *         - codaerolinea
 *         - descripcion
 */
