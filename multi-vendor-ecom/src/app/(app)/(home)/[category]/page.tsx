import { ProductList, ProductListSkelton } from "@/modules/products/ui/components/product-list";
import { trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

const Page = async ({ params }: PageProps) => {
    const { category } = await params;
    // const products = await caller.products.getMany();
    const queryClient = new QueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ category }));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkelton />}>                
                {category ? <ProductList category={category} /> : <ProductList />}
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;