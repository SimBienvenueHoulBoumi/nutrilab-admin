import { getToken } from '../services/auth.service';
import { Ingredient, CreateIngredientDto, UpdateIngredientDto } from '../interface/ingredients.interface';

import 'dotenv/config'

const url = process.env.LOCAL_URL || 'http://localhost:4000';

export async function createIngredient(ingredientData: CreateIngredientDto, articleId: string): Promise<Ingredient> {
    try {
        const token = await getToken();
        const response = await fetch(`${url}/ingredients/${articleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ingredientData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error text:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Ingredient created successfully:', result);
        return result;
    } catch (error) {
        console.error('Failed to create ingredient:', error);
        throw new Error(`Failed to create ingredient: ${error.message}`);
    }
}

export async function getIngredients(articleId: string): Promise<Ingredient[]> {
    try {
        const response = await fetch(`http://localhost:4000/ingredients/${articleId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch ingredients: ${error.message}`);
    }
}

export async function getIngredientById(id: string, articleId: string): Promise<Ingredient> {
    try {
        const response = await fetch(`${url}/ingredients/${articleId}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to fetch ingredients: ${error.message}`);
    }
}

export async function updateIngredient(id: string, articleId: string, ingredientData: UpdateIngredientDto): Promise<Ingredient> {
    try {
        const token = await getToken();
        const response = await fetch(`${url}/ingredients/${articleId}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ingredientData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error text:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Ingredient updated successfully:', result);
        return result;
    } catch (error) {
        console.error('Failed to update ingredient:', error);
        throw new Error(`Failed to update ingredient: ${error.message}`);
    }
}

export async function deleteIngredient(id: string, articleId: string): Promise<void> {
    try {
        const token = await getToken();
        const response = await fetch(`${url}/ingredients/${articleId}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error text:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        console.log('Ingredient deleted successfully:', id);
    } catch (error) {
        console.error('Failed to delete ingredient:', error);
        throw new Error(`Failed to delete ingredient: ${error.message}`);
    }
}