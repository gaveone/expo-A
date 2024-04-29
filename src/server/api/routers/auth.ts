import { object, z } from "zod";
import bcrypt from 'bcryptjs';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
    UserChecker:publicProcedure.input(z.object({email:z.string() ,password:z.string()}))
    .mutation(async({ctx,input})=>{
        console.log(input);
        return"ffffffffffffffffffff"

    }),
    makeNewUser:publicProcedure.input(z.object({
        name: z.string().min(1 ,{message:"This field has to be filled."}),
        dateOfBirth:z.string().min(1 ,{message:"This field has to be filled."}),
        email:z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
        password:z.string().min(5 ,{message:"password  must be at least 5 characters"}),
        confirmPassword:z.string()

    })).mutation( async({ctx ,input})=>{
        const FindUser = await ctx.db.user.findUnique({
            where:{
                email:input.email
            }
        })

        if(FindUser){return{error:"this user exists"}}
        if(!FindUser){
            const salt = await bcrypt.genSalt(10);
            const passwordHash =  await bcrypt.hash(input.password, salt);
        const newUser = await ctx.db.user.create({
            data:{
                name:input.name,
                email:input.email,
                dateOfBirth:input.dateOfBirth,
                password:passwordHash
            }
        })

        }


    }),
    findUser:publicProcedure.input(z.object({
        email:z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email.")
    })).query(async({ ctx ,input}) =>{
        return ctx.db.user.findUnique({where:{email:input.email}})
    }),

    
    findUserValidation:publicProcedure.input(z.object({
        email:z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
        password:z.string(),

    })).mutation(async({ ctx ,input}) =>{
        const FoundUser = await ctx.db.user.findUnique({where:{email:input.email}})
        if(!FoundUser){return {error:"user Does not exist"}}
        const CheckPassword = await bcrypt.compare(input.password ,FoundUser.password)
        if(!CheckPassword){return{error:"user Does not exist"}}
        return{data:input}
    })
 
});
