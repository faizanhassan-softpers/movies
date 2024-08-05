import { NextRequest, NextResponse } from "next/server";
import { fileTypeFromBuffer } from 'file-type';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const arrayBuffer = await req.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        const currentTimeStamp = Date.now();
        const type = await fileTypeFromBuffer(fileBuffer);
        const fileExtension = type?.ext || 'bin'; // Default to '.bin' if extension not detected

        const fileName = `${currentTimeStamp}.${fileExtension}`;
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);

        // Ensure the 'uploads' directory exists
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        // Save the file
        fs.writeFileSync(filePath, fileBuffer);

        return NextResponse.json({
            message: "File uploaded successfully",
            path: `/uploads/${fileName}`
        });
    } catch (error) {
        console.error("Error recieving file:", error);
        return NextResponse.json({ error: "Error recieving file" }, { status: 500 });
    }
}