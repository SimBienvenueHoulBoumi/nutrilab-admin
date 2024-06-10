export interface Ingredient {
    id: string;
    name: string;
    picture: string;
    labelDosage: string;
    dosage: string;
    createdAt: string;
    updatedAt: string;
  }


export interface CreateIngredientDto {
    name: string;
    picture: string;
    labelDosage: string;
    dosage: string;
  }

export interface UpdateIngredientDto {
    name?: string;
    picture?: string;
    labelDosage?: string;
    dosage?: string;
}