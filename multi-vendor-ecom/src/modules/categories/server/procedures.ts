// If 'Category' is not exported from '@/payload-types', define it locally or import the correct type.
// Example local definition (adjust fields as needed):
// type Category = {
//     id: string;
//     name: string;
//     subcategories?: {
//         docs: Category[];
//     };
//     // Add other fields as required
// };

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { CollectionSlug } from 'payload';
import type { Category } from "@/payload-types"; 

export const CategoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        const data = await ctx.db.find({
            collection: 'categories' as CollectionSlug,
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