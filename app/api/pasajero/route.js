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
