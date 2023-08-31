import { db } from "./adapter";
import { ingredients, ingredientsToListsToRecipes, ingredientsToRecipes, recipes } from "./schema";
import { eq } from "drizzle-orm";

export type Ingredient = typeof ingredients.$inferSelect;
export type IngredientsInRecipe = typeof ingredientsToRecipes.$inferSelect;
export type IngredientsInList = typeof ingredientsToListsToRecipes.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;

export const find = async (id: string | undefined): Promise<Ingredient | null> => {
	const results = await db
		.select()
		.from(ingredients)
		.where(eq(ingredients.id, Number(id)));
	return results.length ? results[0] : null;
};

export const findByName = async (name: string): Promise<Ingredient | null> => {
	const results = await db.select().from(ingredients).where(eq(ingredients.name, name));
	return results.length ? results[0] : null;
};

export const insert = async (ingredient: NewIngredient): Promise<Ingredient> => {
	const results = await db.insert(ingredients).values(ingredient).returning();
	return results[0];
};

export const ingredientsInList = async (
	id: string | undefined
): Promise<{ ingredients: Ingredient; ingredientsToListsToRecipes: IngredientsInList }[]> =>
	db
		.select()
		.from(ingredients)
		.innerJoin(
			ingredientsToListsToRecipes,
			eq(ingredients.id, ingredientsToListsToRecipes.ingredientId)
		)
		.innerJoin(recipes, eq(recipes.id, ingredientsToListsToRecipes.listId))
		.where(eq(ingredientsToListsToRecipes.listId, Number(id)));

export const ingredientsInRecipe = async (
	id: string | undefined
): Promise<{ ingredients: Ingredient; ingredientsToRecipes: IngredientsInRecipe }[]> =>
	db
		.select()
		.from(ingredients)
		.innerJoin(ingredientsToRecipes, eq(ingredients.id, ingredientsToRecipes.ingredientId))
		.innerJoin(recipes, eq(recipes.id, ingredientsToRecipes.recipeId))
		.where(eq(ingredientsToRecipes.recipeId, Number(id)));
