"use server";

import {
  Article,
  CreateArticleDto,
  UpdateArticleDto,
} from "../interface/article.interface";
import "dotenv/config";
import { cookies } from "next/headers";


const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function createArticle(
  articleData: CreateArticleDto
): Promise<string> {
  try {
    const token = cookies().get("token")?.value || "";

    const response = await fetch(`${url}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(articleData),
    });

    if ((await response.status) !== 201) {
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
    const token = cookies().get("token")?.value || "";

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
    const token = cookies().get("token")?.value || "";

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

export async function deleteArticleById(id: string): Promise<void> {
  const token = cookies().get("token")?.value || "";

  await fetch(`${url}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateArticleById(
  id: string,
  updateData: UpdateArticleDto
): Promise<string> {
  try {
    const token = cookies().get("token")?.value || "";

    const response = await fetch(`${url}/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const contentType = response.headers.get("content-type");
    if (contentType) {
      return await response.text();
    } else {
      const text = await response.text();
      throw new Error(text);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while updating the article: ${error.message}`
      );
    } else {
      throw new Error("An unknown error occurred while updating the article.");
    }
  }
}
