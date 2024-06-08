// components/LogoutButton.tsx
"use client";

import React from 'react';
import { cleanAndRemoveToken } from "../services/auth.service";

export default function LogoutButton() {
    const logout = () => {
        cleanAndRemoveToken();
        window.location.href = "/";
    };

    return (
        <button
            onClick={logout}
            className="bg-gray-600 p-2 hover:bg-red-500 text-white font-semibold rounded transition duration-300 m-4"
        >
            Logout
        </button>
    );
}
