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