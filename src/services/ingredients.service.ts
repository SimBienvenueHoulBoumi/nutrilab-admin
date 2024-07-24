"use server";

import { getToken } from "../services/auth.service";
import {
  Ingredient,
  CreateIngredientDto,
  UpdateIngredientDto,
} from "../interface/ingredients.interface";

import { cookies } from "next/headers";

import "dotenv/config";

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function createIngredient(
  ingredientData: CreateIngredientDto,
  articleId: string
): Promise<string> {
  const token = cookies().get("token")?.value || "";

  try {
    const response = await fetch(`${url}/ingredients/${articleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ingredientData),
    });

    if (response.status !== 201) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.text();
  } catch (error: any) {
    console.error("Failed to create ingredient:", error);
    throw new Error(`Failed to create ingredient: ${error.message}`);
  }
}

export async function getIngredients(articleId: string): Promise<Ingredient[]> {
  try {
    const response = await fetch(`${url}/ingredients/${articleId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Failed to fetch ingredients: ${error.message}`);
  }
}

export async function getIngredientById(
  id: string,
  articleId: string
): Promise<Ingredient> {
  try {
    const response = await fetch(`${url}/ingredients/${articleId}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Failed to fetch ingredients: ${error.message}`);
  }
}

export async function updateIngredient(
  id: string,
  articleId: string,
  ingredientData: UpdateIngredientDto
): Promise<Ingredient> {
  try {
    const token = await getToken();
    const response = await fetch(`${url}/ingredients/${articleId}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ingredientData),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error(`Failed to update ingredient: ${error.message}`);
  }
}

export async function deleteIngredient(
  id: string,
  articleId: string
): Promise<void> {
  try {
    const token = await getToken();
    const response = await fetch(`${url}/ingredients/${articleId}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete ingredient: ${error.message}`);
  }
}
