"use client";

import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface PriceFiltersProps {
    minPrice?: string | null;
    maxPrice?: string | null;
    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
};

export const formatAsCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    const parts = numericValue.split('.');
    const formatedValue = parts[0] + (parts.length > 1 ? '.' + parts[1]?.slice(0, 2) : '');
    if (!formatedValue) return '';
    const numberValue = parseFloat(formatedValue);
    if (isNaN(numberValue)) return '';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }
    ).format(numberValue);
};

export const PriceFilters = ({
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange
}: PriceFiltersProps) => {

    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9.]/g, '');
        onMinPriceChange(numericValue);
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9.]/g, '');
        onMaxPriceChange(numericValue);
    };
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <Label htmlFor="min-price" className="font-medium text-base">Min Price</Label>
                <Input
                    id="min-price"
                    type="text"
                    placeholder="$0.00"
                    value={minPrice ? formatAsCurrency(minPrice) : ''}
                    onChange={handleMinPriceChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="max-price" className="font-medium text-base">Max Price</Label>
                <Input
                    id="max-price"
                    type="text"
                    placeholder="∞"
                    value={minPrice ? formatAsCurrency(minPrice) : ''}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </div>
    );
};
