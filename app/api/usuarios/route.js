
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna una lista de todos los usuarios.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Una lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *       400:
 *         description: Username o password no proporcionados o inválidos.
 *       409:
 *         description: El username ya está registrado.
 *       500:
 *         description: Error interno del servidor.
 */
import { NextResponse } from "next/server";
import { PrismaClient } from '../../generated/prisma';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET(request){
    try {
        const usuarios = await prisma.usuario.findMany();
        return NextResponse.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return NextResponse.json({ error: "Error interno del servidor al obtener usuarios" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const json = await request.json();
        const username = json.username?.trim();
        const password = json.password;

        if (!username || !password) {
            return NextResponse.json({ error: "username y password son requeridos" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
        }

        const existing = await prisma.usuario.findUnique({ where: { username } });
        if (existing) {
            return NextResponse.json({ error: "El username ya está registrado" }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 10);
        const usuario = await prisma.usuario.create({
            data: {
                username,
                password: hashed
            }
        });
        return NextResponse.json({
            id: usuario.id,
            username: usuario.username
        }, { status: 201 });
    } catch (error) {
        if (error?.code === 'P2002') {
            return NextResponse.json({ error: "El username ya está registrado" }, { status: 409 });
        }
        console.error('Error creando usuario:', error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: "El ID del usuario"
 *         username:
 *           type: string
 *           description: "El nombre de usuario"
 *         email:
 *           type: string
 *           description: "El email del usuario"
 *       required:
 *         - username
 */
