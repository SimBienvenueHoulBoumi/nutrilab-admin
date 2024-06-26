// src/services/auth.service.ts
"use server"

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import DecodedToken from '@/interface/auth.interface';

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export default async function verifyUser(email: string, password: string) {
    try {
        const response = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data.access_token) {
            throw new Error('No access token in response');
        }

        const decodedToken: DecodedToken = jwtDecode(data.access_token as string);

        if (decodedToken.sub.role === 'admin') {
            const cookieStore = cookies();
            cookieStore.set('token', data.access_token, { path: '/' }); // Ensure the path is correct
            return true;
        }
    } catch (error) {
        return false;
    }
}

export async function cleanAndRemoveToken(): Promise<void> {
    const cookieStore = cookies();
    cookieStore.delete('token');
}

export async function getToken(): Promise<string> {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    if (!tokenCookie) {
        throw new Error('Token not found');
    }
    return tokenCookie.value;
}
