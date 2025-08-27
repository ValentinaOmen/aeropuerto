import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const id = params.id;

        const aerolinea = await prisma.aerolinea.findUnique({
            where: { id: id }
        });
   return NextResponse.json(aerolinea);
}


export async function PUT(request, { params }){
    const id = params.id;

        const json = await request.json();
        const aerolinea = await prisma.aerolinea.update({
            where:{id: id},
            data:{
                codaerolinea: json.codaerolinea,
                descripcion: json.descripcion
            }
        });
    return NextResponse.json(aerolinea);
}

export async function DELETE(request,{ params}){
    const id = params.id;
    await prisma.aerolinea.delete({
        where:{id:id}
    });
    return NextResponse.json("Aerolinea eliminada correctamente");
}