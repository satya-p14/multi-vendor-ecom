import type { SearchParams } from "nuqs/server";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/products/search-params";
import { trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


interface PageProps {
    params: Promise<{
        subcategory: string;
    }>,
    searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: PageProps) => {
    const { subcategory } = await params;
    const filters = await loadProductFilters(searchParams);
    console.log(JSON.stringify(filters));
    // const products = await caller.products.getMany();
    const queryClient = new QueryClient();
    void queryClient.prefetchQuery(
        trpc.products.getMany.queryOptions({
            category:subcategory,
            minPrice: filters.minPrice !== null ? Number(filters.minPrice) : null,
            maxPrice: filters.maxPrice !== null ? Number(filters.maxPrice) : null,
            tags: filters.tags !== null ? filters.tags : null
        })
    );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory} />
        </HydrationBoundary>
    );
};

export default Page;