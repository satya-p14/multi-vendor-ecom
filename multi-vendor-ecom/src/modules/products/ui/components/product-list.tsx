"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ProductListProps {
    category? : string;
}

export const ProductList = ({ category }: ProductListProps) => {
    // This component will render a list of products
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({ category }));
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2
         md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {/* {JSON.stringify(data , null , 2)} */}
            {data?.docs.map((product) => (
                <div key={product.id} className="border rounded-md bg-white p-4 flex flex-col">
                    <h2 className="text-lg font-medium mb-2">{product?.name}</h2>
                    <p className="text-sm text-gray-600 mb-4">{product?.description}</p>
                    <div className="mt-auto">
                        <span className="text-xl font-semibold">${product?.price}</span>
                    </div>
                </div>
            ))}
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
