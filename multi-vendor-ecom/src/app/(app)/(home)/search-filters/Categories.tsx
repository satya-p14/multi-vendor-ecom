import { CategoryDropDown } from "./category-drop-down";

interface CategoriesProps {
    data: any;
}

export const Categories = ({ data }: CategoriesProps) => {    
    return (
        <div className="relative w-full ">
            <div className="flex flex-nowrap">
                {data.map((category) => (
                    <div key={category.id}>
                        <CategoryDropDown
                            category={category}
                            isActive={false}
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};