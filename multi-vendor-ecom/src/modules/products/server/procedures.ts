import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { CollectionSlug, Where } from "payload";
import { z } from "zod";
import type { Category } from "@/payload-types";

export const ProductsRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(z.object({
            category: z.string().nullable().optional(),
        }))
        .query(async ({ ctx, input }) => {
            const where: Where = {};
            if (input.category) {
                const categoryData = await ctx.db.find({
                    collection: "categories" as CollectionSlug,
                    limit: 1,
                    depth: 1, // populate subcategories
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.category,
                        },
                    }
                });

                const formattedData = categoryData.docs.map((doc) => {
                    const categoryDoc = doc as Category;
                    return {
                        ...categoryDoc,
                        subcategories: (categoryDoc.subcategories?.docs ?? []).map((subDoc: Category) => ({
                            ...subDoc,
                            subcategories: undefined // Ensure subcategories are undefined if not present
                        }))
                    };
                });
                const subcategoriesSlugs = [];
                const parentCategory = formattedData[0];
                if (parentCategory && "subcategories" in parentCategory) {
                    subcategoriesSlugs.push(...parentCategory.subcategories.map((sub: Category) => sub.slug));
                }
                if (parentCategory && "slug" in parentCategory) {
                    where["category.slug"] = {
                        in: [parentCategory.slug, ...subcategoriesSlugs]
                    };
                }
                const data = await ctx.db.find({
                    collection: "products" as CollectionSlug,
                    depth: 1, //  populate categories and images
                    sort: "name",
                    where
                });

                await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay

                return data;
            }
        })
});