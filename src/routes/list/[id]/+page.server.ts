import type { Actions, Load } from "@sveltejs/kit";
import { complete, connect, find } from "../../../db/lists";
import { findByName, insert, ingredientsInList } from "../../../db/ingredients";
import { recipesWithIngredientsForList } from "../../../db/recipes";

export const actions: Actions = {
	complete: async ({ request }) => {
		const data = await request.formData();
		const completed = data.get("completed") === "true";
		const ingredientId = parseInt(data.get("ingredientId")?.toString() || "");
		const listId = parseInt(data.get("listId")?.toString() || "");
		const recipeId = parseInt(data.get("recipeId")?.toString() || "");

		if (ingredientId && listId && recipeId) {
			await complete(completed, ingredientId, listId, recipeId);
		}
	},
	insert: async ({ request }) => {
		const data = await request.formData();
		const ingredients = data.get("ingredients")?.toString();
		const listId = parseInt(data.get("listId")?.toString() || "");
		const recipeId = parseInt(data.get("recipeId")?.toString() || "");

		if (ingredients) {
			for (const ingredient of ingredients.split(/,|\n/)) {
				const name = ingredient.trim();
				const { id } = (await findByName(name)) || (await insert({ name }));
				await connect(id, listId, recipeId);
			}
		}
	}
};

export const load: Load = async ({ params: { id } }) => ({
	list: await find(id),
	ingredients: (await ingredientsInList(id)).map(
		({ ingredients, ingredientsToListsToRecipes: { completed, recipeId } }) => ({
			...ingredients,
			completed,
			recipeId
		})
	),
	recipes: await recipesWithIngredientsForList(parseInt(id || ""))
});
