"use client"
import {  z } from "zod";
import { useToast } from "@/components/ui/use-toast"
import React ,{useState , useTransition} from 'react'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";


export default function Register() {
    const register =api.auth.makeNewUser.useMutation({
        onSuccess:(date)=>{
            if(date?.error){
                toast({
                    variant: "destructive",
                    title:"Error",
                    description: date.error
                   
                  })
            }

        }
    })
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition();
    const  [user ,setNewUser] = useState({
        name:"",
        dateOfBirth:"",
        email:"",
        password:"",
        confirmPassword:""

    })

    const  registerForm = z.object({
        name: z.string().min(1 ,{message:"This field has to be filled."}),
        dateOfBirth:z.string().min(1 ,{message:"This field has to be filled."}),
        email:z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
        password:z.string().min(5 ,{message:"password  must be at least 5 characters"}),
        confirmPassword:z.string()
        

    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // path of error
      }); 


      function registerFormSubmet() {
        const validUser = registerForm.safeParse(user)
        startTransition(()=>{
            if(validUser.error?.errors){

                validUser.error?.errors.forEach(error =>{
                    toast({
                        variant: "destructive",
                        title:error.path[0]?.toString(),
                        description: error.message,
                       
                      })

                })

            }else{
                if(validUser.data){
                     register.mutate(validUser.data)
                }
                if(register.data){
                    console.log("register", register.data)
                    
                    


                }
               





            }
           
        
        })
       
      }




  return (
    <>

    <div>
        <Label htmlFor="name">Name</Label>
        <Input className=" relative w-96" value={user.name}  name="name" id="name" placeholder="name" onChange={(e)=>{setNewUser(preNewUser  =>{return{...preNewUser ,[e.target.name]:e.target.value}})} }/>
    </div>

    <div>
        <Label htmlFor="dateOfBirth">date Of Birth</Label>
        <Input className=" relative w-96" value={user.dateOfBirth}   type="date" name="dateOfBirth" id="dateOfBirth" placeholder="date Of Birth" onChange={(e)=>{setNewUser(preNewUser  =>{return{...preNewUser ,[e.target.name]:e.target.value}})} }/>
    </div>
    <div>
        <Label htmlFor="email">email</Label>
        <Input className=" relative w-96" value={user.email}   name="email" id="email" placeholder="email" onChange={(e)=>{setNewUser(preNewUser  =>{return{...preNewUser ,[e.target.name]:e.target.value}})} }/>
    </div>
    <div>
        <Label htmlFor="password">password</Label>
        <Input className=" relative w-96" value={user.password}   name="password" id="password" placeholder="password" onChange={(e)=>{setNewUser(preNewUser  =>{return{...preNewUser ,[e.target.name]:e.target.value}})} }/>
    </div>
    <div>
        <Label htmlFor="confirmPassword">confirm Password</Label>
        <Input className=" relative w-96" value={user.confirmPassword}   name="confirmPassword" id="confirmPassword" placeholder="confirm Password" onChange={(e)=>{setNewUser(preNewUser  =>{return{...preNewUser ,[e.target.name]:e.target.value}})} }/>
    </div>

    <Button disabled={isPending} className=" relative w-48"  onClick={registerFormSubmet}> Register</Button>
    <Link href={"/auth/login"}>
        <Button variant={"link"}>login</Button>
    </Link>
        

    </>
  )
}
