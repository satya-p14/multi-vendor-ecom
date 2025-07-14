import configPromise from '@payload-config';
import { getPayload } from 'payload';
import Footer from "./footer";
import Navbar from "./Navbar";
import { SearchFilter } from "./search-filters";

interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const payload = await getPayload({
        config: configPromise
    });

    const data = await payload.find({
        collection: 'categories',
        depth: 1,
        pagination: false,
        where: {
            parent: {
                exists: false
            }
        }
    });   

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilter data={data} />
            <div className="flex-1 bg-[#f4f4f0]">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout; 
