import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request,{params}){
    const id= params.id;
        const destino = await prisma.destino.findUnique({
            where:{id:id}
    });
    return NextResponse.json(destino);
}

export async function PUT(request,{params}){
    const id = params.id;
        const json = await request.json();
        const destino = await prisma.destino.update({
            where:{id:id},
            data:{
                coddestino: json.coddestino,
                descripcion: json.descripcion
            }
        });
    return NextResponse.json(destino);
}

export async function DELETE(request,{params}){
    const id = params.id;
        await prisma.destino.delete({
            where:{id:id}
    });
    return NextResponse.json("Destino eliminado correctamente");
}