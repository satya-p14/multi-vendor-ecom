"use client";
import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-product-filters";
import { cn } from "@/lib/utils";

export const ProductSort = () => {
    const [filters, setfilters] = useProductFilters();

    return (
        <div className="flex item-center gap-2">
            <Button
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "default" &&
                    "bg-transparent border-transparent hover:border-border hover:bg-transparent "
                )}
                variant="secondary"
                onClick={() => setfilters({ sort: "default" })}
            >
                Default
            </Button>
            <Button
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "newest" &&
                    "bg-transparent border-transparent hover:border-border hover:bg-transparent "
                )}
                variant="secondary"
                onClick={() => setfilters({ sort: "newest" })}
            >
                Newest
            </Button>
            <Button
                size="sm"
                className={cn(
                    "rounded-full bg-white hover:bg-white",
                    filters.sort !== "oldest" &&
                    "bg-transparent border-transparent hover:border-border hover:bg-transparent "
                )}
                variant="secondary"
                onClick={() => setfilters({ sort: "oldest" })}
            >
                Oldest
            </Button>
        </div>
    );
};