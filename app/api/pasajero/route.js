/**
 * @swagger
 * /api/pasajero:
 *   get:
 *     summary: Obtener todos los pasajeros
 *     description: Retorna una lista de todos los pasajeros. Puede ser filtrado por vueloId.
 *     tags: [Pasajeros]
 *     parameters:
 *       - in: query
 *         name: vueloId
 *         schema:
 *           type: string
 *         description: El ID del vuelo para filtrar los pasajeros.
 *     responses:
 *       200:
 *         description: Una lista de pasajeros.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pasajero'
 *   post:
 *     summary: Crear un nuevo pasajero
 *     description: Crea un nuevo pasajero con la información proporcionada.
 *     tags: [Pasajeros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pasajero'
 *     responses:
 *       200:
 *         description: Pasajero creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pasajero'
 */
import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const vueloId = searchParams.get("vueloId");

    if (vueloId) {
        const pasajeros = await prisma.pasajero.findMany({
            where: { vueloId: vueloId }
        });
        return NextResponse.json(pasajeros);
    } else {
        const pasajeros = await prisma.pasajero.findMany();
        return NextResponse.json(pasajeros);
    }
}

export async function POST(request) {
    const json = await request.json();
    const pasajero = await prisma.pasajero.create({
        data: {
            nombre: json.nombre,
            apellido: json.apellido,
            email: json.email,
            telefono: json.telefono,
            foto: json.foto,
            vueloId: json.vueloId,
        }
    });
    return NextResponse.json(pasajero);
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Pasajero:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: "El nombre del pasajero"
 *         apellido:
 *           type: string
 *           description: "El apellido del pasajero"
 *         email:
 *           type: string
 *           description: "El email del pasajero"
 *         telefono:
 *           type: string
 *           description: "El telefono del pasajero"
 *         foto:
 *           type: string
 *           description: "La foto del pasajero"
 *         vueloId:
 *           type: string
 *           description: "El ID del vuelo al que pertenece el pasajero"
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - telefono
 *         - vueloId
 */
