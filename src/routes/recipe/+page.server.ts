import { fail, type Actions } from "@sveltejs/kit";
import { insert, list } from "../../db/recipes.js";

export const load = async () => ({ recipes: await list() });

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get("name")?.toString();
		const url = data.get("url")?.toString();

		if (!name || !url) fail(406);

		const response = await insert({ name, url });
		console.log(response);
	}
};
