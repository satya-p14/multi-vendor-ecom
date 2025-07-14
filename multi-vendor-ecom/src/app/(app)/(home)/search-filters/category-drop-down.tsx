"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/payload-types';
import { useRef, useState } from 'react';
import { useDropdownPosition } from './use-drodown-position';
import { SubCategoryMenu } from './sub-category-menu';

interface CategoryDDProps {
    category: Category;
    isActive?: boolean;
    isNavigationHovered?: boolean;
}

export const CategoryDropDown = ({ category, isActive, isNavigationHovered }: CategoryDDProps) => {

    const [isOpen, isSetOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const {getDropdownPosition} = useDropdownPosition(dropDownRef);

    const onMouseEnter = () => {
        if (category.subcategories) {
            isSetOpen(true);
        }
    };

    const onMouseLeave = () => isSetOpen(true);

    const dropdownPosition = getDropdownPosition();

    return (
        <div className='relative'
            ref={dropDownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <div className='relative'>
                <Button variant="elevated" className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                    isActive && !isNavigationHovered && "bg-white border-primary"
                )}>
                    {category.name}
                </Button>
                {category.subcategories && category.subcategories.length != 0 && (
                    <div className={cn("opacity-50 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px]  border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1.5", isOpen && "opacity-90 bg-pink-50 ")} />
                )}
            </div>
            <SubCategoryMenu 
                category={category}
                isOpen={isOpen}
                position={dropdownPosition}
            />
        </div>

    );
};