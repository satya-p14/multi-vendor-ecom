import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { sortValues } from "../search-params";
import { CollectionSlug, Sort, Where } from "payload";
import { z } from "zod";
import type { Category, Media } from "@/payload-types";
import { DEFAULT_LIMIT } from "@/constants";
``;

export const ProductsRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(z.object({
            cursor: z.number().default(1),
            limit:z.number().default(DEFAULT_LIMIT),
            category: z.string().nullable().optional(),
            minPrice: z.number().nullable().optional(),
            maxPrice: z.number().nullable().optional(),
            tags: z.array(z.string()).nullable().optional(),
            sort: z.enum(sortValues).nullable().optional(),
            // minDate: z.date().nullable().optional(),
            // maxDate: z.date().nullable().optional(),
        }))
        .query(async ({ ctx, input }) => {
            const where: Where = {};
            let sort: Sort = "-createdAt";

            if (input.sort === "newest") {
                sort = "-createdAt";
            }

            if (input.sort === "oldest") {
                sort = "+CreatedAt";
            }

            if (input.sort === "default") {
                sort = "name";
            }

            if (input.minPrice && input.maxPrice) {
                where.price = {
                    greater_than_equal: input.minPrice,
                    less_than_equal: input.maxPrice
                };
            } else if (input.maxPrice) {
                where.price = {
                    less_than_equal: input.maxPrice
                };
            } else if (input.minPrice) {
                where.price = {
                    greater_than_equal: input.minPrice
                };
            }

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

                if (input.tags && input.tags.length > 0) {
                    where["tags.name"] = {
                        in: input.tags,
                    };
                }

                const data = await ctx.db.find({
                    collection: "products" as CollectionSlug,
                    depth: 1, //  populate categories and images                    
                    where,
                    sort,
                    page:input.cursor,
                    limit:input.limit
                });

                await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay
                console.log(data, "=====");
                return {
                    ...data,
                    docs: data.docs.map((doc: any) => ({
                        ...doc,
                        image: doc.image as Media | null
                    }))
                };
            }
        })
});