import { RecipeItem, type RecipeItemData } from "./RecipeItem";

const STORAGE_KEY = "recipe-book:recipes";

export class RecipeCollection {
  private recipes: RecipeItem[] = [];

  constructor(initial: RecipeItem[] = []) {
    this.recipes = initial;
  }

  getAll(): RecipeItem[] {
    return [...this.recipes];
  }

  add(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.save();
  }

  remove(id: string): void {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    this.save();
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find((r) => r.id === id);
    if (recipe) {
      recipe.toggleFavorite();
      this.save();
    }
  }

  clearAll(): void {
    this.recipes = [];
    this.save();
  }

  save(): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recipes));
  }

  static load(): RecipeCollection {
    if (typeof window === "undefined") return new RecipeCollection();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return new RecipeCollection();
      const parsed: RecipeItemData[] = JSON.parse(raw);
      return new RecipeCollection(parsed.map(RecipeItem.fromJSON));
    } catch {
      return new RecipeCollection();
    }
  }
}
