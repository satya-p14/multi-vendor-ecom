import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import Footer from "./footer";
import Navbar from "./Navbar";
import SearchFilterLoading, { SearchFilter } from "./search-filters";
import { Suspense } from 'react';
import { useTRPC } from '@/trpc/client';


interface Props {
    children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {   
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HydrateClient>
                <Suspense fallback={<SearchFilterLoading />}>
                    <SearchFilter />
                </Suspense>
            </HydrateClient>
            <div className="flex-1 bg-[#f4f4f0]">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout; 
