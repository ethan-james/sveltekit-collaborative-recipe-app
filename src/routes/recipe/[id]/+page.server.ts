import type { Actions, Load } from "@sveltejs/kit";
import { connect, find } from "../../../db/recipes";
import { findByName, insert, ingredientsInRecipe } from "../../../db/ingredients";

export const actions: Actions = {
	default: async ({ request }) => {
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
	}
};

export const load: Load = async ({ params: { id } }) => ({
	recipe: await find(id),
	ingredients: (await ingredientsInRecipe(id)).map(({ ingredients }) => ingredients)
});
