import { CategoryDropDown } from "./category-drop-down";

interface CategoriesProps {
    data: any;
}

export const Categories = ({ data }: CategoriesProps) => {
    console.log({data}, "category");
    return (
        <div>
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
    );
};