import { Recipe } from '../types/types';

// Generic fetch function that handles the network request
export const fetchRecipesApi = async (): Promise<Recipe[]> => {
  const response = await fetch('https://dummyjson.com');
  
  if (!response.ok) {
    throw new Error('Failed to fetch recipes from the server');
  }
  
  const data = await response.json();
  return data.recipes; // Returns array of recipes
};
