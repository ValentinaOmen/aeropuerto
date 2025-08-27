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
