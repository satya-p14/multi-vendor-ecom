import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";


interface SearchInputProps {
    disabled?: boolean;
    data: CustomCategory[];
}

export const SearchInput = ({ disabled, data }: SearchInputProps) => {
    //  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex items-center gap-2 w-full">
            {/* <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/> */}
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-4 -translate-y-1.5 size-4 text-neutral-500" />
                <Input className="pl-8" placeholder="Search Products" disabled={disabled} />
            </div>
            {/* <Button variant="elevated"
                className="size-10 shrink-0 flex items-center justify-center lg:hidden"
                disabled={disabled}                >
                <ListFilterIcon />
            </Button> */}
        </div>
    );
};