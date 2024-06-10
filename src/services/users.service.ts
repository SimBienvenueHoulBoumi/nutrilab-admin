import { getToken } from '../services/auth.service'

interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
}

export async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(`https://nutrilab-backend-api.onrender.com/users`, {
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
        const response = await fetch(`https://nutrilab-backend-api.onrender.com/users/${id}`, {
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
        await fetch(`${process.env.LOCAL_URL}/users/${id}`, {
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