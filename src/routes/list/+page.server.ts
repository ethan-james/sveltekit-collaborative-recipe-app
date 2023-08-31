import { fail, type Actions } from "@sveltejs/kit";
import { insert, list } from "../../db/lists.js";

export const load = async () => ({ lists: await list() });

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get("name")?.toString();

		if (!name) fail(406);

		const response = await insert({ name });
		console.log(response);
	}
};
