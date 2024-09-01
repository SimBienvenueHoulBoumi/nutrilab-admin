import { getToken } from '../services/auth.service'
import User from '@/interface/users.interface'

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(`${url}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        });

        return await response.json();
    } catch {
        throw new Error('Network response was not ok');
    }
}

export async function getUserById(id: string): Promise<User> {
    try {
        const response = await fetch(`${url}/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        });

        return await response.json();
    } catch {
        throw new Error('Network response was not ok');
    }
}

export async function deleteUserById(id: string): Promise<void> {
    try {
        await fetch(`${url}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        });
    } catch {
        throw new Error('Network response was not ok');
    }
}

export async function usersRegister(): Promise<number>{
    return (await getUsers()).length;
}