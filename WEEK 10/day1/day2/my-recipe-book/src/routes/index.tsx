import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { RecipeItem } from "@/model/RecipeItem";
import { RecipeCollection } from "@/model/RecipeCollection";
import { RecipeTemplate } from "@/templates/RecipeTemplate";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Recipe Book — Your personal cookbook" },
      {
        name: "description",
        content:
          "A simple recipe book app to save, favorite, and manage your personal recipes.",
      },
      { property: "og:title", content: "Recipe Book" },
      {
        property: "og:description",
        content: "Save, favorite, and manage your personal recipes.",
      },
    ],
  }),
  component: RecipeBookPage,
});

function RecipeBookPage() {
  const [collection] = useState(() => RecipeCollection.load());
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    setRecipes(collection.getAll());
  }, [collection]);

  const refresh = () => setRecipes(collection.getAll());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !ingredients.trim() || !instructions.trim()) return;
    const ing = ingredients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    collection.add(new RecipeItem(title.trim(), ing, instructions.trim()));
    setTitle("");
    setIngredients("");
    setInstructions("");
    refresh();
  };

  const handleDelete = (id: string) => {
    collection.remove(id);
    refresh();
  };

  const handleToggleFavorite = (id: string) => {
    collection.toggleFavorite(id);
    refresh();
  };

  const handleClearAll = () => {
    if (recipes.length === 0) return;
    if (!confirm("Delete all recipes? This cannot be undone.")) return;
    collection.clearAll();
    refresh();
  };

  const visibleRecipes = useMemo(
    () => (showFavoritesOnly ? recipes.filter((r) => r.isFavorite) : recipes),
    [recipes, showFavoritesOnly],
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Your kitchen, organized
          </p>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Recipe Book
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Save your favorite recipes, mark the ones you love, and keep them
            close — all stored right in your browser.
          </p>
        </header>

        <section className="mb-12 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-card-foreground">
            Add a recipe
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-medium text-card-foreground"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Grandma's Apple Pie"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="ingredients"
                className="mb-1.5 block text-sm font-medium text-card-foreground"
              >
                Ingredients{" "}
                <span className="text-muted-foreground">(comma separated)</span>
              </label>
              <input
                id="ingredients"
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="flour, butter, apples, sugar, cinnamon"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="instructions"
                className="mb-1.5 block text-sm font-medium text-card-foreground"
              >
                Instructions
              </label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Mix the dry ingredients, fold in the apples, bake at 180°C for 45 minutes..."
                rows={4}
                className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Add Recipe
            </button>
          </form>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                {visibleRecipes.length}{" "}
                {visibleRecipes.length === 1 ? "Recipe" : "Recipes"}
              </h2>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={showFavoritesOnly}
                  onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                Favorites only
              </label>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              disabled={recipes.length === 0}
              className="rounded-md border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              Clear All Recipes
            </button>
          </div>

          {visibleRecipes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
              <p className="text-muted-foreground">
                {recipes.length === 0
                  ? "No recipes yet. Add your first one above!"
                  : "No favorites yet. Star a recipe to see it here."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {visibleRecipes.map((recipe) => (
                <RecipeTemplate.Card
                  key={recipe.id}
                  recipe={recipe}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
