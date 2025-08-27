import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request, { params } ) {
    const id = params.id; 

    const vuelo= await prisma.vuelo.findUnique({
        where:{id: id},
        include:{
            aerolinea: true,
            destino: true
        }
    });
    return NextResponse.json(vuelo);
}

export async function PUT(request,{params}) {
    const id = params.id;
    const json = await request.json();
    const vuelo = await prisma.vuelo.update({
        where:{id:id},
        data: {
            codvuelo: json.codvuelo,
            coddestino: json.coddestino,
            codaerolinea: json.codaerolinea,
            salaabordaje: json.salaabordaje,
            horasalida: json.horasalida,
            horallegada: json.horallegada
        }
    });
    return NextResponse.json(vuelo);
}

export async function DELETE(request,{params}) {
    const id = params.id;
    await prisma.vuelo.delete({
        where:{id:id}
    });
    return NextResponse.json("Vuelo eliminado correctamente");
}