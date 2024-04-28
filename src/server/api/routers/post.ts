import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAllProduct:publicProcedure.query(({ctx})=>{
    return ctx.db.product.findMany()

  })
 
});
