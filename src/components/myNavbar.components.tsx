"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { cleanAndRemoveToken } from "@/services/auth.service";

export default function MyNavbar() {
  const logout = useCallback(async () => {
    await cleanAndRemoveToken();
    window.location.href = "/";
  }, []);

  return (
    <div className="flex flex-row justify-between">
      {/* Navbar content */}
      <div className="flex flex-row space-x-2 m-2">
        <Link
          href="/dashboard/home"
          className="block p-2 hover:bg-gray-600 rounded"
        >
          <div>Home</div>
        </Link>
        <Link
          href="/dashboard/users"
          className="block p-2 hover:bg-gray-600 rounded"
        >
          <div>Users</div>
        </Link>
        <Link
          href="/dashboard/articles"
          className="block p-2 hover:bg-gray-600 rounded"
        >
          <div>Articles</div>
        </Link>
        <Link
          href="/dashboard/ingredients"
          className="block p-2 hover:bg-gray-600 rounded"
        >
          <div>Ingredients</div>
        </Link>
      </div>
      <button
        onClick={logout}
        className="bg-gray-600 w-[200px] p-2 m-2 hover:bg-red-500 text-white font-semibold rounded transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}
