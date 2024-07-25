"use client";

import React, { useState, useEffect } from "react";
import MyNavbar from "@/components/myNavbar.components";

export default function Layout({ children }: { children: React.ReactNode }) {
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
    <div className="flex flex-col min-h-screen">
      <MyNavbar />
      <div className="flex flex-1 flex-col p-4 bg-green-100">
        {!isLoading && !initialLoad && children}
      </div>
    </div>
  );
}
