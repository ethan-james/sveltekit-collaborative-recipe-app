import { db } from "./adapter";
import { ingredients, ingredientsToListsToRecipes, recipes } from "./schema";
import { and, eq } from "drizzle-orm";

export type Ingredient = typeof ingredients.$inferSelect;
export type IngredientsInList = typeof ingredientsToListsToRecipes.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
export enum Status {
	None,
	Missing,
	Completed
}

export const disconnect = (ingredientId: string, recipeId: string) => {};

export const find = async (id: string): Promise<Ingredient | null> => {
	const results = await db.select().from(ingredients).where(eq(ingredients.id, id));
	return results.length ? results[0] : null;
};

export const findByName = async (name: string): Promise<Ingredient | null> => {
	const results = await db.select().from(ingredients).where(eq(ingredients.name, name));
	return results.length ? results[0] : null;
};

export const getStatus = (i: IngredientsInList): Status =>
	i.listId ? (i.completed ? Status.Completed : Status.Missing) : Status.None;

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
): Promise<{ ingredients: Ingredient; ingredientsToListsToRecipes: IngredientsInList }[]> =>
	db
		.select()
		.from(ingredients)
		.innerJoin(
			ingredientsToListsToRecipes,
			eq(ingredients.id, ingredientsToListsToRecipes.ingredientId)
		)
		.innerJoin(recipes, eq(recipes.id, ingredientsToListsToRecipes.recipeId))
		.where(
			and(
				eq(ingredientsToListsToRecipes.recipeId, Number(id)),
				eq(ingredientsToListsToRecipes.deleted, false)
			)
		)
		.orderBy(ingredients.locked);

export const lockIngredient = async (id: string) =>
	db.update(ingredients).set({ locked: true }).where(eq(ingredients.id, id));

export const unlockIngredient = async (id: string) =>
	db.update(ingredients).set({ locked: false }).where(eq(ingredients.id, id));
