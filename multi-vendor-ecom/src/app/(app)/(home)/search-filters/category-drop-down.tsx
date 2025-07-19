"use client";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useDropdownPosition } from './use-drodown-position';
import { SubCategoryMenu } from './sub-category-menu';
import Link from 'next/link';
import { CategoriesGetManyOutput } from '@/modules/categories/types';

interface CategoryDDProps {
    category: CategoriesGetManyOutput[1];
    isActive?: boolean;
    isNavigationHovered?: boolean;
}

export const CategoryDropDown = ({ category, isActive, isNavigationHovered }: CategoryDDProps) => {

    const [isOpen, isSetOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;;
    const { getDropdownPosition } = useDropdownPosition(dropDownRef);

    const onMouseEnter = () => {
        if (category.subcategories) {
            isSetOpen(true);
        }
    };

    const onMouseLeave = () => isSetOpen(false);

    const dropdownPosition = getDropdownPosition();

    const toggleDropdown = () => {
        if (category.subcategories && category.subcategories.length > 0) {
            isSetOpen(!isOpen);
        }
    };

    return (
        <div className='relative'
            ref={dropDownRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={toggleDropdown}>
            <div className='relative'>
                <Button variant="elevated" className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-green-600 hover:border-primary text-black hover:text-white",
                    isActive && !isNavigationHovered && "bg-white border-primary",
                    isOpen && "bg-green-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                )}>
                    <Link href={category.slug !== 'all' ? `/${category.slug}` : '/'}>
                        {category.name}
                    </Link>
                </Button>
                {isOpen && category.subcategories && category.subcategories.length != 0 && (
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