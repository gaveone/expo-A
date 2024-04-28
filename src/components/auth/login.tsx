"use client"
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast"
import React ,{useState , useTransition} from 'react'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";
import { signIn } from "next-auth/react"

function Login() {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition();
    const ValidationUser = api.auth.findUserValidation.useMutation({
        onSuccess: (error) => {
            if(error){
                toast({
                    variant: "destructive",
                    title:"Error",
                    description: error.error,
                   
                  })
            }
            if(error.data){
                const user = error.data
                 signIn('credentials', {  
                    email:user.email, 
                    password: user.password
                })
            }

        }
    })
    const  [user ,setNewUser] = useState({
       
        email:"",
        password:"",
     

    })
    const  loginForm = z.object({
        email:z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
        password:z.string().min(1 ,{message:"This field has to be filled"}),
        
    })


    async function registerFormSubmet() {  
        console.log("1")
        const validUser = loginForm.safeParse(user)
        if(validUser.error?.errors){
            console.log("2")

            validUser.error?.errors.forEach(error =>{
                console.log("3-E")
                toast({
                    variant: "destructive",
                    title:error.path[0]?.toString(),
                    description: error.message,
                   
                  })

            })

        }else{
            console.log("4")
            const Data = validUser.data   
            if(Data){ValidationUser.mutate(Data) } 
          

        }
       
      }
  return (
    <>
    <div>
        <Label htmlFor="email">email</Label>
        <Input className=" relative w-96" value={user.email}   name="email" id="email" placeholder="email" onChange={(e)=>{setNewUser(preNewUser  =>{return{...preNewUser ,[e.target.name]:e.target.value}})} }/>
    </div>
    <div>
        <Label htmlFor="password">password</Label>
        <Input className=" relative w-96" value={user.password}   name="password" id="password" placeholder="password" onChange={(e)=>{setNewUser(preNewUser  =>{return{...preNewUser ,[e.target.name]:e.target.value}})} }/>

    </div>


    <Button disabled={isPending} className=" relative w-48"  onClick={ (e)=>{e.preventDefault();registerFormSubmet()}}> Register</Button>
    <Link href={"/auth/register"}>
        <Button variant={"link"}>register</Button>
    </Link>
        


    </>
  )
}

export default Login