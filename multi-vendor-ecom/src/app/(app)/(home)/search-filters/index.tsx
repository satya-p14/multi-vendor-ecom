import { Category } from '@/payload-types';
import { Categories } from "./Categories";
import { SearchInput } from "./search-input";

interface SearchFilterProps {
    data: any;
}

export const SearchFilter = ({ data }: SearchFilterProps) => {

    const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc?.subcategories?.docs ?? []).map((doc: Category) => ({
            ...(doc as Category)
        }))
    }));

    console.log({
        data, formattedData
    });

    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput />
            <Categories data={formattedData} />
            {/* {JSON.stringify(data, null, 2)} */}
        </div>
    );
};