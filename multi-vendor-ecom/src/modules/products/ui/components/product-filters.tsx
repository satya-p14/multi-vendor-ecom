"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { PriceFilters } from "./price-filters";
import { useProductFilters } from "../../hooks/use-product-filters";

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
    const onChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };
    return (
        <div className="border rounded-md p-4 bg-white" >
            <div className="p-4 border-b flex justify-between items-center">
                <p className="font-medium">Filters</p>
                <button className="underline" onClick={() => { }} type="button">Clear</button>
            </div>
            <ProductFilter title="Price" className="border-0">
                <PriceFilters
                    minPrice={filters.minPrice}
                    maxPrice={filters.maxPrice}
                    onMinPriceChange={(value) => onChange('minPrice', value)}
                    onMaxPriceChange={(value) => onChange('maxPrice', value)} />
            </ProductFilter>

        </div>
    );
}

