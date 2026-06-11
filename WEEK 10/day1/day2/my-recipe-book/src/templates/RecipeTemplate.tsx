import { useState } from "react";
import type { RecipeItem } from "@/model/RecipeItem";

interface RecipeTemplateProps {
  recipe: RecipeItem;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export class RecipeTemplate {
  /**
   * Renders a single recipe card. Implemented as a React component method
   * so the class can encapsulate all DOM rendering logic for a recipe.
   */
  static Card({ recipe, onToggleFavorite, onDelete }: RecipeTemplateProps) {
    const [expanded, setExpanded] = useState(false);

    return (
      <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl font-semibold leading-tight text-card-foreground">
            {recipe.title}
          </h3>
          <button
            type="button"
            aria-label={recipe.isFavorite ? "Unfavorite" : "Favorite"}
            onClick={() => onToggleFavorite(recipe.id)}
            className="shrink-0 text-2xl leading-none transition-transform hover:scale-110"
          >
            {recipe.isFavorite ? "★" : "☆"}
          </button>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {recipe.ingredients.length} ingredient
          {recipe.ingredients.length === 1 ? "" : "s"}
        </p>

        {expanded && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ingredients
              </h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-card-foreground">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Instructions
              </h4>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-card-foreground">
                {recipe.instructions}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {expanded ? "Hide details" : "Show details"}
          </button>
          <button
            type="button"
            onClick={() => onDelete(recipe.id)}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            Delete
          </button>
        </div>
      </article>
    );
  }
}
