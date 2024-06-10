export interface Article {
    id: string;
    name: string;
    description: string;
    area: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }
  
export interface CreateArticleDto {
    name: string;
    description: string;
    area: string;
  }
  
export interface UpdateArticleDto {
    name?: string;
    description?: string;
    area?: string;
  }