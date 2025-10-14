import type { SearchParams } from "nuqs/server";
import { trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface PageProps {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: PageProps) => {
  const filters = await loadProductFilters(searchParams);
  console.log(JSON.stringify(filters));
  // const products = await caller.products.getMany();
  const queryClient = new QueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      minPrice: filters.minPrice !== null ? Number(filters.minPrice) : null,
      maxPrice: filters.maxPrice !== null ? Number(filters.maxPrice) : null,
      tags: filters.tags !== null ? filters.tags : null,
      limit: DEFAULT_LIMIT
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
};

export default Page;