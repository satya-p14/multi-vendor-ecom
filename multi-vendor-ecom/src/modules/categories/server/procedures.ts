import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const CategoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        const data = await ctx.db.find({
            collection: 'categories',
            depth: 1,
            pagination: false,
            where: {
                parent: {
                    exists: false
                }
            },
            sort: "name"
        });

        const formattedData = data.docs.map((doc) => {
            const categoryDoc = doc as Category;
            return {
                ...categoryDoc,
                subcategories: (categoryDoc.subcategories?.docs ?? []).map((subDoc: Category) => ({
                    ...subDoc,
                    subcategories: undefined // Ensure subcategories are undefined if not present
                }))
            };
        });

        return formattedData;
    })
});