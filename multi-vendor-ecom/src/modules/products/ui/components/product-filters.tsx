"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilters } from "./price-filters";
import { useProductFilters } from "../../hooks/use-product-filters";
import { TagsFilters } from "./tags-filters";

interface ProductFiltersProps {
    title?: string;
    className?: string;
    children?: React.ReactNode;
};

const ProductFilter = ({ title, className, children }: ProductFiltersProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

    return (
        <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
            <div
                onClick={() => setIsOpen((isOpen) => !isOpen)}
                className="flex justify-between items-center cursor-pointer">
                <p className="font-medium">{title}</p>
                <Icon className="size-5" />
            </div>
            {isOpen && <div>{children}</div>}
        </div>
    );
};

export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilters();
    const onClear = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            tags: []
        });
    };
    const onChange = (key: keyof typeof filters, value: string | string[]) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    // const onTagChange = (key: keyof typeof filters, value: string[]) => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         [key]: value
    //     }));
    // };

    // const hasAnyFilter = Object.values(filters).some((value) => value !== null && value !== '');

    const hasAnyFilter = Object.values(filters).some(([key, value]) => {
        if (key === "sort") {
            return false;
        }
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        if (typeof value === 'string') {
            return value !== "";
        }
        return value !== null;
    });
    
    return (
        <div className="border rounded-md p-4 bg-white" >
            <div className="p-4 border-b flex justify-between items-center" >
                <p className="font-medium">Filters</p>
                {hasAnyFilter && (
                    <button className="underline cursor-pointer" onClick={onClear} type="button">Clear</button>
                )}
            </div>
            <ProductFilter title="Price">
                <PriceFilters
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange('minPrice', value)}
                    onMaxPriceChange={(value) => onChange('maxPrice', value)} />
            </ProductFilter>
            <ProductFilter title="Tags" className="border-0">
                <TagsFilters
                    value={filters.tags}
                    onChange={(value) => onChange('tags', value)} />
            </ProductFilter>

        </div>
    );
}

