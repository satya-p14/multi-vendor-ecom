"use client";
import { useSuspenseQuery } from '@tanstack/react-query';
import { Categories } from "./Categories";
import { SearchInput } from "./search-input";
import { useTRPC } from '@/trpc/client';
import { useParams } from 'next/navigation';
import { DEFAULT_BG_COLOR } from '@/modules/home/constants';
import { BreadcrumbsNavigation } from './Breadcrumbs-navigation';

export const SearchFilter = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    const params = useParams();
    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || 'all';
    const activeCategoryData = data.find(cat => cat.slug === activeCategory);
    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
    const activeCategoryName = activeCategoryData?.name || null;
    const activeSubCategory = params.subcategory as string | undefined;
    const activeSubCategoryName = activeCategoryData?.subcategories?.find((sub: { slug: string | undefined; }) => sub.slug === activeSubCategory)?.name || null;

    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: activeCategoryColor }}>
            <SearchInput />
            <Categories data={data} />
            <BreadcrumbsNavigation
                activeCategoryName={activeCategoryName}
                activeCategory={activeCategory}
                activeSubCategoryName={activeSubCategoryName} />
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