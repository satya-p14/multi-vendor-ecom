import { AuthRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { CategoriesRouter } from '@/modules/categories/server/procedures';
import { ProductsRouter } from '@/modules/products/server/procedures';
import { ta } from 'date-fns/locale';
import { TagsRouter } from '@/modules/tags/server/procedures';
export const appRouter = createTRPCRouter({
   auth:AuthRouter,
   tags:TagsRouter,
   products: ProductsRouter,
   categories:CategoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;