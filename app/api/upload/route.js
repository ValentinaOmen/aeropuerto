/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Subir un archivo
 *     description: Sube un archivo al servidor.
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Archivo subido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: Archivo no encontrado.
 *       500:
 *         description: Error subiendo archivo.
 */
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadsDir, { recursive: true });

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const filePath = path.join(uploadsDir, safeName);
    await fs.writeFile(filePath, buffer);

    const url = `/uploads/${safeName}`;
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "Error subiendo archivo" }, { status: 500 });
  }
}


