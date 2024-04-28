"use client";
import { redirect } from 'next/navigation'
import Link from 'next/link';



import React from "react";
import { Button } from "./ui/button";

export default function Nav() {
  return <div className="  h-[73px]  bg-[#D9D9D9] items-center grid grid-flow-col  ">
    <div className="flex flex-row gap-6 items-center relative h-full m-3">
        <IconLogo/>
    </div>
    

    <div className=" flex  gap-6 items-center flex-row-reverse ">
       
       
       
        <div className=" flex flex-row gap-2 items-center mr-6">
            <Cart/>
            <p className=" text-[#0F172A]">0</p>
        </div>

        <Link href={'/auth/login'}>
             <Button>login</Button>
        </Link>

        <Link href={'/auth/register'}>
         <Button>register</Button>
        </Link>
    </div>
    

  </div>;
}

function IconLogo() {
  return (
    <>
      <svg width="60" height="44" viewBox="0 0 60 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.9707 8.77348C44.9648 11.2404 43.3207 13.3027 40.006 14.9558C36.6993 13.2871 35.0649 11.2171 35.0707 8.75009C35.0765 6.27986 36.7256 3.3913 40.0412 0.082571C43.3411 3.40693 44.9765 6.30325 44.9707 8.77348Z" fill="black" stroke="#622626" strokeWidth="0.1"/>
<path d="M0 21.3992C48.1354 52.8992 13.6354 -3.10084 60 21.3992C60 51.3992 0 51.3992 0 21.3992Z" fill="black"/>
<path d="M47 25C48.1046 25 49 24.1046 49 23C49 21.8954 48.1046 21 47 21C45.8954 21 45 21.8954 45 23C45 24.1046 45.8954 25 47 25Z" fill="#B40B0B"/>
</svg>

    </>
  );
}


function Cart() {
    return(
        <>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 10.5H24.5V22.1667C24.5 22.7855 24.2542 23.379 23.8166 23.8166C23.379 24.2542 22.7855 24.5 22.1667 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V10.5Z" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.5 10.5L6.35833 4.78333C6.55313 4.39676 6.85161 4.072 7.22041 3.84536C7.58922 3.61872 8.01379 3.49914 8.44667 3.5H19.5533C19.9882 3.49697 20.4152 3.61552 20.7863 3.84228C21.1573 4.06904 21.4577 4.39498 21.6533 4.78333L24.5 10.5" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 3.5V10.5" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        </>
    )
    
}