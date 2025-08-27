import { NextResponse } from "next/server";
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(request,{params}){
    const id= params.id;
        const pasajero = await prisma.pasajero.findUnique({
            where:{id:id}
    });
    return NextResponse.json(pasajero);
}

export async function PUT(request,{params}){
    const id = params.id;
        const json = await request.json();
        const pasajero = await prisma.pasajero.update({
            where:{id:id},
            data:{
                nombre: json.nombre,
                apellido: json.apellido,
                telefono: json.telefono,
                email: json.email,
                foto: json.foto,
                codvuelo: json.codvuelo
            }
        });
    return NextResponse.json(pasajero);
}

export async function DELETE(request,{params}){
    const id = params.id;
        await prisma.pasajero.delete({
            where:{id:id}
    });
    return NextResponse.json("pasajero eliminado correctamente");
}