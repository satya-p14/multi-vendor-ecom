import { DEFAULT_LIMIT } from "@/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { CollectionSlug } from "payload";
import { z } from "zod";

export const TagsRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(z.object({
            cursor: z.number().default(1),
            limit: z.number().default(DEFAULT_LIMIT),
        }))
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "tags" as CollectionSlug,
                page: input.cursor,
                limit: input.limit,
            });
            return data;
        }),
    });


