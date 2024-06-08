"use client";

import Link from "next/link";
import React, { useCallback } from 'react';
import { cleanAndRemoveToken } from "@/services/auth.service";
import { useRouter } from 'next/navigation'

export default function MyHeader() {
    const router = useRouter();

    const logout = useCallback(() => {
        cleanAndRemoveToken();
        router.push("/");
    }, [router]);

    return (
        <div className="bg-gray-800 text-white shadow-md h-screen flex flex-col justify-between">
            <div className="flex flex-col space-y-2 p-2 capitalize">
                <Link className="hover:bg-gray-600 p-2" href="/dashboard/home">
                    <div className="text-lg font-semibold">Home</div>
                </Link>
                <Link className="hover:bg-gray-600 p-2 text-sm" href="/dashboard/users">
                    <div>Users</div>
                </Link>
                <Link className="hover:bg-gray-600 p-2 text-sm" href="/dashboard/articles">
                    <div>Articles</div>
                </Link>
                <Link className="hover:bg-gray-600 p-2 text-sm" href="/dashboard/ingredients">
                    <div>Ingredients</div>
                </Link>
            </div>
            <button
                onClick={logout}
                className="bg-gray-600 m-2 p-2 hover:bg-red-500 text-white font-semibold rounded transition duration-300"
            >
                Logout
            </button>
        </div>
    );
}
