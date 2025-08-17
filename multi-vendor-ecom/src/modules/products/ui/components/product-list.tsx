"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ProductListProps {
    category?: string;
}

export const ProductList = ({ category }: ProductListProps) => {
    // This component will render a list of products
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({ category }));
    return (
        <div>
            <h2>Product List</h2><br />
            {JSON.stringify(data, null, 2)}
        </div>
    );
};

export const ProductListSkelton = () => {
    return (
        <div>
            Loading ...
        </div>
    );
};
