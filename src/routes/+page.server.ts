import type { Load } from "@sveltejs/kit";
import { getMeals } from "../db/recipes";

export const load: Load = async ({ params: { id } }) => ({
	meals: await getMeals()
});
