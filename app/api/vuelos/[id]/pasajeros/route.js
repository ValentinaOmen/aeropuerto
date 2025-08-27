import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const vueloId = params.id;

    if (!vueloId) {
        return NextResponse.json({ error: "Flight ID is required" }, { status: 400 });
    }

    try {
        const pasajeros = await prisma.pasajero.findMany({
            where: { vueloId: vueloId },
            include: { vuelo: true } // Optionally include flight details
        });
        return NextResponse.json(pasajeros);
    } catch (error) {
        console.error("Error fetching passengers for flight:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}