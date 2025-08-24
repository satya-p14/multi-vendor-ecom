import type { SearchParams } from "nuqs/server";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import { ProductList, ProductListSkelton } from "@/modules/products/ui/components/product-list";
import { trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductSort } from "@/modules/products/ui/components/product-sort";

interface PageProps {
    params: Promise<{
        category: string;
    }>,
    searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: PageProps) => {
    const { category } = await params;
    const filters = await loadProductFilters(searchParams);
    console.log(JSON.stringify(filters));
    // const products = await caller.products.getMany();
    const queryClient = new QueryClient();
    void queryClient.prefetchQuery(
        trpc.products.getMany.queryOptions({
            category,
            minPrice: filters.minPrice !== null ? Number(filters.minPrice) : null,
            maxPrice: filters.maxPrice !== null ? Number(filters.maxPrice) : null,
            tags: filters.tags !== null ? filters.tags : null
        })
    );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:item-center gap-y-2 lg:gap-y-0 justify-between">
                    <p className="text-2xl font-medium">Curated for you</p>
                    {/* <p>SORRING</p> */}
                    <ProductSort />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
                    <div className="lg:col-span-2 xl:col-span-2 ">
                        <ProductFilters />
                    </div>
                    <div className="lg:col-span-4 xl:col-span-6 ">
                        <Suspense fallback={<ProductListSkelton />}>
                            {category ? <ProductList category={category} /> : <ProductList />}
                        </Suspense>
                    </div>
                </div>
            </div>
        </HydrationBoundary>
    );
};

export default Page;