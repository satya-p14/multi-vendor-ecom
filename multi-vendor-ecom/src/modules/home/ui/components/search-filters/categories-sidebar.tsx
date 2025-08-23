import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface CategorySidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: CategorySidebarProps) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    const [parentCategory, setParentCategory] = useState<CategoriesGetManyOutput[0] | null>(null);
    const [activeCategory, setActiveCategory] = useState<(CategoriesGetManyOutput[0] & { color?: string; }) | null>(null);
    const currentCategory = parentCategory ? parentCategory.subcategories : data ?? [];
    const router = useRouter();
    const backgroundColor = activeCategory && activeCategory.color ? activeCategory.color : "whitesmoke";
    const handleBackClick = () => {
        if (parentCategory) {
            setParentCategory(null);
            setActiveCategory(null);
        } else {
            onOpenChange(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetContent side="left" className="p-0 transition-none" style={{ backgroundColor: backgroundColor }}>
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col h-full overflow-y-auto pb-2">
                    {parentCategory && (
                        <button onClick={handleBackClick} className="w-full text-left p-4 hover:bg-black hover:text-white flex item-center text-base font-medium" >
                            <ChevronLeftIcon className="w-4 mr-2" />
                            Back
                        </button>
                    )}
                    {currentCategory.map((category) => (
                        <button
                            key={category.slug}
                            onClick={() => {
                                if (
                                    category.subcategories &&
                                    (
                                        Array.isArray(category.subcategories)
                                            ? category.subcategories.length > 0
                                            : category.subcategories.docs && category.subcategories.docs.length > 0
                                    )
                                ) {
                                    setParentCategory(category as CategoriesGetManyOutput[0]);
                                    setActiveCategory(category as CategoriesGetManyOutput[0] & { color?: string; });
                                } else {
                                    if (parentCategory && activeCategory) {
                                        router.push(`/${activeCategory.slug}/${category.slug}`);
                                    } else {
                                        if (category.slug !== 'all') {
                                            router.push(`/${category.slug}`);
                                        } else {
                                            router.push('/');
                                        }
                                    }
                                    setActiveCategory(category as CategoriesGetManyOutput[0] & { color?: string; });
                                    onOpenChange(false);
                                }
                            }}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium"
                        >
                            {"name" in category && category.name ? category.name : category.slug}
                            {(category.subcategories &&
                                (
                                    Array.isArray(category.subcategories)
                                        ? category.subcategories.length > 0
                                        : category.subcategories.docs && category.subcategories.docs.length > 0
                                )
                            ) && (
                                    <ChevronRightIcon className="w-4" />
                                )}

                        </button>
                    ))};
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};