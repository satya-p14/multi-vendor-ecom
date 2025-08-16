interface PageProps {
    params: Promise<{
        category: string;
        subcategory?: string;
    }>;
}

const Page = async ({ params }: PageProps) => {
    const { category ,subcategory } = await params;
    return (
        <div>
            Category page : {category}
            <p>Content for sub category: {subcategory}</p>
        </div>
    );
};

export default Page;