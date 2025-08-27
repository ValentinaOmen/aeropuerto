import { NextResponse } from "next/server";
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function GET(){
    const aerolineas = await prisma.aerolinea.findMany();
    return NextResponse.json(aerolineas);
}

export async function POST(request) {
    const json = await request.json();    
    const aerolinea = await prisma.aerolinea.create({
        data: { 
            codaerolinea: json.codaerolinea,
            descripcion: json.descripcion
         }
    });
    return NextResponse.json({success: true});
}