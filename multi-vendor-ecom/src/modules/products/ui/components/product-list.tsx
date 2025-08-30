"use client";
import { useTRPC } from "@/trpc/client";
import { useProductFilters } from "../../hooks/use-product-filters";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { Media } from "@/payload-types";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";

interface ProductListProps {
    category?: string;
}

export const ProductList = ({ category }: ProductListProps) => {
    // This component will render a list of products
    const [filters] = useProductFilters();
    const trpc = useTRPC();
    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
            {
                minPrice: filters.minPrice !== null ? Number(filters.minPrice) : null,
                maxPrice: filters.maxPrice !== null ? Number(filters.maxPrice) : null,
                category,
                limit: DEFAULT_LIMIT
            },
            {
                getNextPageParam: (lastPage) => {
                    return lastPage?.docs && lastPage?.docs.length > 0 ? lastPage?.nextPage : undefined;
                }
            }
        ));

    if (data?.pages?.[0]?.docs.length === 0) {
        return (
            <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 g-bg-white w-full rounded-lg">
                <InboxIcon />
                <p className="text-base font-medium">No product found</p>
            </div>
        );
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2
         md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {/* {JSON.stringify(data , null , 2)} */}
                {(data?.pages.flatMap((page) => page?.docs) as Array<{ image: Media; id: string; name: string; description?: string; price: number; }>).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product?.image?.url}
                        authorUsername="Satya"
                        authorImageUrl={undefined}
                        reviewRating={3}
                        reviewCount={5}
                        price={product.price}
                    />

                    // <div key={product.id} className="border rounded-md bg-white p-4 flex flex-col">
                    //     <h2 className="text-lg font-medium mb-2">{product?.name}</h2>
                    //     <p className="text-sm text-gray-600 mb-4">{product?.description}</p>
                    //     <div className="mt-auto">
                    //         <span className="text-xl font-semibold">${product?.price}</span>
                    //     </div>
                    // </div>
                ))}
            </div>
            <div className="flex justify-center pt-8">
                {hasNextPage && (
                    <Button
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        className="font-medium disabled:opacity-50 text-base bg-white"
                        variant="elevated"
                    >
                        Load more
                    </Button>
                )}
            </div>
        </>
    );
};

export const ProductListSkelton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2
         md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};
