"use client";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react"
import { toast } from "sonner";
export default function Home(){
    const [dis, setDis] = React.useState(false);
    const [lang, setLang] = React.useState("");
    const [code, setCode] = React.useState("");
    const [out, setOut] = React.useState("");
    const runCode = async() => {
        if(lang == "" || code == ""){
            return toast("Language & Code Is Required")
        }
        setDis(true);
        const req = await fetch('/api/runCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({lang: lang, code: code})
        })
        const data = await req.json();
        setOut(data.out);
        toast(data.message);
        setDis(false);
    }
    return(
        <div className="flex flex-col justify-center items-center mx-auto gap-4 mt-4">
            <Select onValueChange={setLang}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose A Language"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Languages</SelectLabel>
                        <SelectItem value="js">JavaScript</SelectItem>
                        <SelectItem value="py">Python</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Textarea className="mt-4" placeholder="Write Your Code" onChange={(e)=>{setCode(e.target.value)}}></Textarea>
            <Button disabled={dis} className="mt-3" onClick={()=>{
                runCode();
            }}>Run Code</Button>
            {out != "" && (
                <div className="mt-3">
                    <pre>{out}</pre>
                </div>
            )}
        </div>
    )
}
