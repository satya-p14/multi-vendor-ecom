import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders} from "next/headers";
import { SignInSchema, SignUpSchema } from "../schemas";
import { generateAuthCookie } from "../utils";

export const AuthRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers });
        return session;
    }),
    login: baseProcedure
        .input(SignInSchema)
        .mutation(async ({ input, ctx }) => {
            const existingData = await ctx.db.find({
                collection: "users",
                limit: 1,
                where: {
                    username: {
                        equals: input.email
                    }
                }
            });

            const existingUser = existingData.docs[0];
            if (existingUser) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User already exists with this email"
                });
            };
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password
                }
            });
            if (!data.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to login"
                });
            }
            // Set the auth cookie
            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token
            });

            return data;
        }),
    register: baseProcedure
        .input(SignUpSchema)
        .mutation(async ({ input, ctx }) => {
            await ctx.db.create({
                collection: "users",
                data: {
                    email: input.email,
                    username: input.username,
                    password: input.password, // this will be hashed

                }
            });
            // login after registration            
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password
                }
            });
            if (!data.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to login"
                });
            }
            // Set the auth cookie
            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token
            });
        })    
});