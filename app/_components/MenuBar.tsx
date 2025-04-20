"use client";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@/components/ui/menubar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function MenuBar(){
    const router = useRouter();
    return(
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Cloud Applications</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={()=>{router.push('/'); toast("Redirecting....")}}>Forgot Password</MenubarItem>
              <MenubarItem onClick={()=>{router.push('/codeSandbox'); toast("Redirecting....")}}>Code SandBox</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
    )
}