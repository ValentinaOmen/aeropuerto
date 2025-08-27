import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET(request,{params}){
    const id= params.id;
        const usuario = await prisma.usuario.findUnique({
            where:{id:id}
    });
    return NextResponse.json(usuario);
}

export async function PUT(request,{params}){
    try {
        const id = params.id;
        const json = await request.json();
        const data = {};

        if (json.username !== undefined) data.username = String(json.username).trim();
        if (json.password !== undefined) {
            if (String(json.password).length < 6) {
                return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
            }
            data.password = await bcrypt.hash(String(json.password), 10);
        }

        const usuario = await prisma.usuario.update({
            where: { id: id },
            data
        });
        return NextResponse.json({
            id: usuario.id,
            username: usuario.username
        });
    } catch (error) {
        if (error?.code === 'P2002') {
            return NextResponse.json({ error: "El username ya está registrado" }, { status: 409 });
        }
        if (error?.code === 'P2025') {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }
        console.error('Error actualizando usuario:', error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}

export async function DELETE(request,{params}){
    try {
        const id = params.id;
        await prisma.usuario.delete({
            where:{id:id},
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        if (error?.code === 'P2025') {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }
        console.error('Error eliminando usuario:', error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}