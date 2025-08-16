import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "../constants";
import { SignInSchema, SignUpSchema } from "../schemas";

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
            const cookies = await getCookies();
            cookies.set({
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/",
                // TODO : Ensure cross domain cookie sharing
                // sameSite:"none",
                // domain:""                
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
            const cookies = await getCookies();
            cookies.set({
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/",
                // TODO : Ensure cross domain cookie sharing
                // sameSite:"none",
                // domain:""                
            });
        }),
    logout: baseProcedure.mutation(async () => {
        const cookie = getCookies();
        (await cookie).delete(AUTH_COOKIE);
    })
});