import { Category } from '@/payload-types';
import { Categories } from "./Categories";
import { SearchInput } from "./search-input";
import { CustomCategory } from '../types';


interface SearchFilterProps {    
    data: CustomCategory[];
}

export const SearchFilter = ({ data }: SearchFilterProps) => {

    const formattedData: CustomCategory[] = data.docs.map((doc: { subcategories: { docs: unknown; }; }) => ({
        ...doc,
        subcategories: (doc?.subcategories?.docs ?? []).map((doc: Category) => ({
            ...(doc as Category)
        }))
    }));

    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput data={data} />            
            <Categories data={formattedData} />
        </div>
    );
};