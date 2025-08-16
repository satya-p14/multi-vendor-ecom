interface PageProps {
    params: Promise<{
        category: string;        
    }>;
}

const Page = async ({ params }: PageProps) => {
    const { category } = await params;
    return (
        <div>            
            <p>Content for category: {category}</p>
            
        </div>
    );
};

export default Page;