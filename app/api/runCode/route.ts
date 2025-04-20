import { NextRequest, NextResponse } from "next/server";
import {execa} from "execa";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";
export async function POST(req: NextRequest){
    const {lang, code} = await req.json(); 
    const tempFile = path.join(os.tmpdir(), `temp.${lang === "js" ? "mjs" : "py"}`);
    await writeFile(tempFile, code);
    try{
        const command = lang === "js" ? "node" : "python3";
        const result = await execa(command, [tempFile]);
        await unlink(tempFile);
        return NextResponse.json({out: result.stdout, message: "Output Displayed"});
    }catch(e){
        console.log(e);
        unlink(tempFile);
        return NextResponse.json({message: "Something Went Wrong. Try Again"});
    }
}