import { AuthRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { CategoriesRouter } from '@/modules/categories/server/procedures';
export const appRouter = createTRPCRouter({
   auth:AuthRouter,
   categories:CategoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;