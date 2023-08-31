import { db } from "./adapter";
import { recipes } from "./schema";
import { eq } from "drizzle-orm";
import { ingredientsToRecipes } from "./schema";
import type { Ingredient } from "./ingredients";

export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;

export const connect = async (ingredientId: number, recipeId: number) =>
	db.insert(ingredientsToRecipes).values({ ingredientId, recipeId });

export const find = async (id: string | undefined): Promise<Recipe | null> => {
	const results = await db
		.select()
		.from(recipes)
		.where(eq(recipes.id, Number(id)));
	return results.length ? results[0] : null;
};

export const insert = async (recipe: NewRecipe): Promise<Recipe[]> =>
	db.insert(recipes).values(recipe).returning();

export const list = async (): Promise<Recipe[]> => db.select().from(recipes);

export const recipesWithIngredientsForList = async (
	listId: number
): Promise<(Recipe & { ingredients: (Ingredient & { completed: boolean })[] })[]> =>
	(
		await db.query.recipes.findMany({
			with: {
				ingredientsToRecipes: { with: { ingredient: true } },
				ingredientsToListsToRecipes: true
			}
		})
	).map((recipe) => ({
		...recipe,
		ingredients: recipe.ingredientsToRecipes.map((i) => ({
			...i.ingredient,
			completed: !!recipe.ingredientsToListsToRecipes.find(
				(j) => j.ingredientId === i.ingredientId && j.completed
			)
		})),
		ingredientsToRecipes: undefined,
		ingredientsToListsToRecipes: undefined
	}));
