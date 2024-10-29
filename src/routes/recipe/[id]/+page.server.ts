import type { Actions, Load } from "@sveltejs/kit";
import { connect as connectList, disconnect as disconnectList } from "../../../db/lists";
import { connect, find, findMeal, schedule } from "../../../db/recipes";
import {
	findByName,
	getStatus,
	insert,
	ingredientsInRecipe,
	lockIngredient,
	unlockIngredient
} from "../../../db/ingredients";

export const actions: Actions = {
	addIngredientToShoppingList: async ({ request }) => {
		const data = await request.formData();
		const ingredientId = parseInt(data.get("ingredientId")?.toString() || "");
		const listId = parseInt(data.get("listId")?.toString() || "");
		const recipeId = parseInt(data.get("recipeId")?.toString() || "");
		await connectList(ingredientId, listId, recipeId);
	},
	insert: async ({ request }) => {
		const data = await request.formData();
		const ingredients = data.get("ingredients")?.toString();
		const recipeId = parseInt(data.get("recipeId")?.toString() || "");

		if (ingredients) {
			for (const ingredient of ingredients.split(/,|\n/)) {
				const name = ingredient.trim();
				const { id } = (await findByName(name)) || (await insert({ name }));
				await connect(id, recipeId);
			}
		}
	},
	lockIngredient: async ({ request }) => {
		const data = await request.formData();
		const ingredientId = parseInt(data.get("ingredientId")?.toString() || "");
		if (ingredientId) await lockIngredient(ingredientId);
	},
	removeIngredientFromRecipe: async ({ request }) => {
		const data = await request.formData();
		const ingredientId = parseInt(data.get("ingredientId")?.toString() || "");
		const recipeId = parseInt(data.get("recipeId")?.toString() || "");
	},
	removeIngredientFromShoppingList: async ({ request }) => {
		const data = await request.formData();
		const ingredientId = parseInt(data.get("ingredientId")?.toString() || "");
		const listId = parseInt(data.get("listId")?.toString() || "");
		const recipeId = parseInt(data.get("recipeId")?.toString() || "");
		await disconnectList(ingredientId, listId, recipeId);
	},
	schedule: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get("id")?.toString() || "0");
		const scheduled = data.get("scheduled")?.toString();
		await schedule(id, scheduled || null);
	},
	unlockIngredient: async ({ request }) => {
		const data = await request.formData();
		const ingredientId = parseInt(data.get("ingredientId")?.toString() || "");
		if (ingredientId) await unlockIngredient(ingredientId);
	}
};

export const load: Load = async ({ params: { id } }) => ({
	meal: await findMeal(id),
	recipe: await find(id),
	ingredients: (await ingredientsInRecipe(id)).map(
		({ ingredients, ingredientsToListsToRecipes }) => ({
			...ingredients,
			status: getStatus(ingredientsToListsToRecipes)
		})
	)
});
