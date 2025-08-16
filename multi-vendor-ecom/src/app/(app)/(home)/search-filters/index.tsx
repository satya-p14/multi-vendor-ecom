"use client";
import { useSuspenseQuery } from '@tanstack/react-query';
import { Categories } from "./Categories";
import { SearchInput } from "./search-input";
import { useTRPC } from '@/trpc/client';

export const SearchFilter = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: '#F5F5F5' }}>
            <SearchInput />
            <Categories data={data} />
        </div>
    );
};

const SearchFilterLoading = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: '#F5F5F5' }}>
            <SearchInput disabled />
            <div className='h-11' />
        </div>
    );
};

export default SearchFilterLoading;