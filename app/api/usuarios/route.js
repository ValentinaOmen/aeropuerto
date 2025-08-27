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