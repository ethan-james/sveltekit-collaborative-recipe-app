import { db } from "./adapter";
import { ingredientsToListsToRecipes, meals, recipes } from "./schema";
import { eq, gte } from "drizzle-orm";
import type { Ingredient } from "./ingredients";

export type Meal = typeof meals.$inferSelect;
export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;

export const connect = async (ingredientId: string, recipeId: string) =>
	db.insert(ingredientsToListsToRecipes).values({ ingredientId, recipeId });

// const dateString = (date: Date): string => new Intl.DateTimeFormat("fr-CA").format(date);

export const find = async (id: string): Promise<Recipe | null> => {
	const results = await db.select().from(recipes).where(eq(recipes.id, id));
	return results.length ? results[0] : null;
};

export const findMeal = async (id: string): Promise<Meal | null> => {
	const results = await db.select().from(meals).where(eq(meals.recipeId, id));
	return results.length ? results[0] : null;
};

export const getMeals = async (): Promise<{ meals: Meal; recipes: Recipe }[]> =>
	db
		.select()
		.from(meals)
		.innerJoin(recipes, eq(recipes.id, meals.recipeId))
		.where(gte(meals.scheduled, new Date()));

export const insert = async (recipe: NewRecipe): Promise<Recipe[]> =>
	db.insert(recipes).values(recipe).returning();

export const list = async (): Promise<Recipe[]> => db.select().from(recipes);

export const recipesWithIngredientsForList = async (): Promise<
	(Recipe & { ingredients: (Ingredient & { completed: boolean })[] })[]
> =>
	(
		await db.query.recipes.findMany({
			with: {
				ingredientsToListsToRecipes: { with: { ingredient: true } }
			}
		})
	).map((recipe) => ({
		...recipe,
		ingredients: recipe.ingredientsToListsToRecipes.map((i) => ({
			...i.ingredient,
			completed: !!recipe.ingredientsToListsToRecipes.find(
				(j) => j.ingredientId === i.ingredientId && j.completed
			)
		})),
		ingredientsToListsToRecipes: undefined
	}));

export const schedule = (recipeId: string, scheduled: Date): Promise<Meal[]> =>
	scheduled === null
		? db.delete(meals).where(eq(meals.recipeId, recipeId)).returning()
		: db
				.insert(meals)
				.values({ recipeId, scheduled })
				.onConflictDoUpdate({ target: meals.recipeId, set: { scheduled } })
				.returning();
