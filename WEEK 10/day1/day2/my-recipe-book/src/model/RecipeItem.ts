import { v4 as uuidv4 } from "uuid";

export interface RecipeItemData {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

export class RecipeItem implements RecipeItemData {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite = false,
    id: string = uuidv4(),
  ) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  static fromJSON(data: RecipeItemData): RecipeItem {
    return new RecipeItem(
      data.title,
      data.ingredients,
      data.instructions,
      data.isFavorite,
      data.id,
    );
  }
}
