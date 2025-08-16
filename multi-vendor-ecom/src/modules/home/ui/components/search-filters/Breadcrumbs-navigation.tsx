import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BreadcrumbsNavigationProps {
    activeCategoryName?: string | null;
    activeCategory?: string | null;
    activeSubCategoryName?: string | null;
}


export const BreadcrumbsNavigation = ({ activeCategoryName, activeCategory, activeSubCategoryName }: BreadcrumbsNavigationProps) => {
    if (!activeCategoryName || activeCategory === 'all') return null; // No breadcrumbs to display   
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {activeCategoryName ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className="text-xl font-medium underline text-primary">
                                <Link href={`/${activeCategory}`}>
                                    {activeCategoryName}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary font-medium text-xl">
                            /
                        </BreadcrumbSeparator>

                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-xl font-medium ">
                                {activeSubCategoryName}
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                    </>
                ) : (
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-xl font-medium ">
                            {activeCategoryName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};