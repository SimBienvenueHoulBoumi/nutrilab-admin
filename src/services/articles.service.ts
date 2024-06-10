import { getToken } from '../services/auth.service';
import { Article, CreateArticleDto, UpdateArticleDto } from '../interface/article.interface';

import 'dotenv/config'

export async function createArticle(articleData: CreateArticleDto): Promise<Article> {
    const url = process.env.LOCAL_URL || 'http://localhost:4000';
    console.log(`Making request to: ${url}/articles`);

    try {
        const token = await getToken();
        const response = await fetch(`${url}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(articleData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response error text:', errorText);
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Article created successfully:', result);
        return result;
    } catch (error) {
        console.error('Failed to create article:', error);
        throw new Error(`Failed to create article: ${error.message}`);
    }
}

export async function getArticles(): Promise<Article[]> {
    try {
        const response = await fetch(`http://localhost:4000/articles`, {
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
        throw new Error(`Failed to fetch articles: ${error.message}`);
    }
}

export async function getArticleById(id: string): Promise<Article> {
    try {
        const response = await fetch(`http://localhost:4000/articles/${id}`, {
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
        throw new Error(`Failed to fetch article: ${error.message}`);
    }
}

export async function deleteArticleById(id: string): Promise<void> {
    try {
        console.log(`Attempting to delete article with id: ${id}`);
        const token = await getToken();
        const response = await fetch(`http://localhost:4000/articles/${id}`, {
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

        console.log('Article deleted successfully');
    } catch (error) {
        console.error('Failed to delete article:', error);
        throw new Error(`Failed to delete article: ${error.message}`);
    }
}

export async function updateArticleById(id: string, updateData: UpdateArticleDto): Promise<Article> {
    try {
        const response = await fetch(`http://localhost:4000/articles/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Failed to update article: ${error.message}`);
    }
}
