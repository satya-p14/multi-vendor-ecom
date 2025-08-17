import { ProductList, ProductListSkelton } from "@/modules/products/ui/components/product-list";
import { trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{
        subcategory: string;
    }>;
}

const Page = async ({ params }: PageProps) => {
    const { subcategory } = await params;
    // const products = await caller.products.getMany();
    const queryClient = new QueryClient();
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ category: subcategory }));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ProductListSkelton />}>
                {subcategory ? <ProductList category={subcategory} /> : <ProductList />}
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;