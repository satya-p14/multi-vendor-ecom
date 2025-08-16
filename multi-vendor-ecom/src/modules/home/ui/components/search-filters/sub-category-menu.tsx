// import { Category } from '@/payload-types';
// Define Category type locally if not exported from '@/payload-types'
type Category = {
    slug: string;
    name: string;
    // Add other properties if needed
};
import Link from 'next/link';
import { CategoriesGetManyOutput } from '@/modules/categories/types';

interface SubCategoryMenuProps {
    category: CategoriesGetManyOutput[1];
    isOpen: boolean;
    position: { top: number, left: number; };
}

export const SubCategoryMenu = ({
    category,
    isOpen,
    position
}: SubCategoryMenuProps) => {
    if (!isOpen || !category.subcategories || (category.subcategories ?? []).length === 0) {
        return null;
    }
    const bgColor = category.color || "#f5f5f5";

    return (
        <div className='fixed z-100'
            style={{ top: position.top, left: position.left }}>
            <div className='h-3 w-60 p-4' />
            <div className='w-60 text-black rounded-md overflow-hidden border
             bg-amber-50' style={{ borderRadius: "10px " }}>
                <div>
                    {category.subcategories?.map((subCat: Category) => (
                        <Link key={subCat.slug} href={`/${category.slug}/${subCat.slug}`}
                            className='w-full text-left p-4 border-b-2 border-black hover:bg-gray-300  hover:text-black hover:border-r-6 hover:border-green-600 hover:underline flex justify-between  items-center font-medium' 
                            style={{ borderRadius: "10px " }} >
                            {subCat.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
