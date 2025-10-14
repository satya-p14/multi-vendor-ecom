import type { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";

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
    void queryClient.prefetchInfiniteQuery(
        trpc.products.getMany.infiniteQueryOptions({
            minPrice: filters.minPrice !== null ? Number(filters.minPrice) : null,
            maxPrice: filters.maxPrice !== null ? Number(filters.maxPrice) : null,
            tags: filters.tags !== null ? filters.tags : null,
            category: subcategory,
            limit: DEFAULT_LIMIT
        })
    );    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory} />
        </HydrationBoundary>
    );
};

export default Page;