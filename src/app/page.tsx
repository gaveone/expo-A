import Link from "next/link";


import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Nav from "@/components/Nav";

export default async function Home() {
  
  const session = await getServerAuthSession();

  return (
    <>
    <Nav/>
    <main className=" flex-1 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
     
    </main>
    
    </>
  );
}

