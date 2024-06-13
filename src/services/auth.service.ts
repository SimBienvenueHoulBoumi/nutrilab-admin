"use server"

import { cookies } from 'next/headers';
// import { isValidToken } from '@/middleware';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    sub: {
        id: string;
        username: string;
        firstname: string;
        lastname: string;
        role: string;
        password: string;
        createdAt: string;
        updatedAt: string;
    };
    iat: number;
    exp: number;
}

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

        // Assurez-vous que data contient access_token
        if (!data.access_token) {
            throw new Error('No access token in response');
        }

        const decodedToken: DecodedToken = jwtDecode(data.access_token as string);


        if (decodedToken.sub.role === 'admin') {
            cookies().set('token', data.access_token);
            return true;
        }

    } catch (error) {
        return false;
    }
}


export async function cleanAndRemoveToken(): Promise<void> {
    cookies().delete('token');
}

export async function getToken(): Promise<string> {
    const tokenCookie = cookies().get('token');
    if (!tokenCookie) {
      throw new Error('Token not found');
    }
    return tokenCookie.value;
  }