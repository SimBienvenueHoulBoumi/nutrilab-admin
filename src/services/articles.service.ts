import { getToken } from "../services/auth.service";
import {
  Article,
  CreateArticleDto,
  UpdateArticleDto,
} from "../interface/article.interface";
import "dotenv/config";

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function createArticle(
  articleData: CreateArticleDto
): Promise<string> {
  try {
    const token = await getToken();
    const response = await fetch(`${url}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });

    if ((await response.text()) != "article created") {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.text();
  } catch (error: any) {
    console.error("Failed to create article:", error);
    throw new Error(`Failed to create article: ${error.message}`);
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const token = await getToken();
    const response = await fetch(`${url}/articles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to fetch articles:", error);
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }
}

export async function getArticleById(id: string): Promise<Article> {
  try {
    const token = await getToken();
    const response = await fetch(`${url}/articles/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to fetch article:", error);
    throw new Error(`Failed to fetch article: ${error.message}`);
  }
}

export async function deleteArticleById(id: string): Promise<string> {
  try {
    const token = await getToken();
    const response = await fetch(`${url}/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return "Article deleted successfully";
  } catch (error: any) {
    console.error("Failed to delete article:", error);
    throw new Error(`Failed to delete article: ${error.message}`);
  }
}

export async function updateArticleById(
  id: string,
  updateData: UpdateArticleDto
): Promise<string> {
  try {
    const token = await getToken();
    const response = await fetch(`${url}/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to update article:", error);
    throw new Error(`Failed to update article: ${error.message}`);
  }
}
