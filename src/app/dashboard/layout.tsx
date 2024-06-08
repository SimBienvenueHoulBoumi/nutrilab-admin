"use client"
import React, { useState, useEffect } from 'react';
import MyNavbar from '@/components/myNavbar.components';

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                setInitialLoad(false); 
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [initialLoad]);

    return (
        <div className="flex min-h-screen">
            {/* Loader */}
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
                </div>
            )}

            <div className="w-[250px] bg-gray-800 text-white fixed top-0 left-0 h-full overflow-y-auto">
                <MyNavbar />
            </div>
            
            <div className="p-6 bg-green-100 w-full ml-[250px]">
                {!isLoading && !initialLoad && children}
            </div>
        </div>
    );
}
