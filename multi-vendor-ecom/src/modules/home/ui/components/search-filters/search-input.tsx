import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CategoriesSidebar } from "./categories-sidebar";

interface SearchInputProps {
    disabled?: boolean;
}

export const SearchInput = ({ disabled }: SearchInputProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());
    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-4 -translate-y-1.5 size-4 text-neutral-500" />
                <Input className="pl-8" placeholder="Search Products" disabled={disabled} />
            </div>
            <Button variant="elevated"
                className="size-10 shrink-0 flex items-center justify-center lg:hidden"
                disabled={disabled}                >
                <ListFilterIcon />
            </Button>
            {session.data?.user && (
                <Button 
                asChild
                variant="elevated">
                    <Link href="/library">
                        <BookmarkCheckIcon/>
                        Library
                    </Link>
                </Button>

            )}
        </div>
    );
};