/**
 * @swagger
 * /api/vuelos:
 *   get:
 *     summary: Obtener todos los vuelos
 *     description: Retorna una lista de todos los vuelos con sus relaciones (aerolinea, destino, pasajeros).
 *     tags: [Vuelos]
 *     responses:
 *       200:
 *         description: Una lista de vuelos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vuelo'
 *   post:
 *     summary: Crear un nuevo vuelo
 *     description: Crea un nuevo vuelo con la información proporcionada.
 *     tags: [Vuelos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vuelo'
 *     responses:
 *       200:
 *         description: Vuelo creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vuelo'
 */
import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
    const vuelos = await prisma.vuelo.findMany({
        include: {
            aerolinea: true,
            destino: true,
            pasajeros: true
        }
    });
    return NextResponse.json(vuelos);
}

export async function POST(request) {
    const json = await request.json();
    const vuelo = await prisma.vuelo.create({
        data: {
            codvuelo: json.codvuelo,
            coddestino: json.coddestino,
            codaerolinea: json.codaerolinea,
            salaabordaje: json.salaabordaje,
            horasalida: json.horasalida,
            horallegada: json.horallegada,
        }
    });
    return NextResponse.json(vuelo);
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Vuelo:
 *       type: object
 *       properties:
 *         codvuelo:
 *           type: string
 *           description: "El código del vuelo"
 *         coddestino:
 *           type: string
 *           description: "El código del destino"
 *         codaerolinea:
 *           type: string
 *           description: "El código de la aerolínea"
 *         salaabordaje:
 *           type: string
 *           description: "La sala de abordaje"
 *         horasalida:
 *           type: string
 *           format: date-time
 *           description: "La hora de salida del vuelo"
 *         horallegada:
 *           type: string
 *           format: date-time
 *           description: "La hora de llegada del vuelo"
 *       required:
 *         - codvuelo
 *         - coddestino
 *         - codaerolinea
 *         - salaabordaje
 *         - horasalida
 *         - horallegada
 */
