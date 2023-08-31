import { and, eq } from "drizzle-orm";
import { db } from "./adapter";
import { lists } from "./schema";
import { ingredientsToListsToRecipes } from "./schema";

export type List = typeof lists.$inferSelect;
export type NewList = typeof lists.$inferInsert;

export const complete = async (
	completed: boolean,
	ingredientId: number,
	listId: number,
	recipeId: number
) =>
	db
		.update(ingredientsToListsToRecipes)
		.set({ completed })
		.where(
			and(
				eq(ingredientsToListsToRecipes.ingredientId, ingredientId),
				eq(ingredientsToListsToRecipes.listId, listId),
				eq(ingredientsToListsToRecipes.recipeId, recipeId)
			)
		);

export const connect = async (ingredientId: number, listId: number, recipeId: number) =>
	db.insert(ingredientsToListsToRecipes).values({ ingredientId, listId, recipeId });

export const find = async (id: string | undefined): Promise<List | null> => {
	const results = await db
		.select()
		.from(lists)
		.where(eq(lists.id, Number(id)));
	return results.length ? results[0] : null;
};

export const insert = async (list: NewList): Promise<List[]> =>
	db.insert(lists).values(list).returning();

export const list = async (): Promise<List[]> => db.select().from(lists);
