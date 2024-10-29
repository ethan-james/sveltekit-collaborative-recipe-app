import { integer, text, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const meals = sqliteTable("meals", {
	id: text("id").primaryKey(),
	scheduled: integer("scheduled", { mode: "timestamp" }),
	recipeId: text("recipeId")
		.notNull()
		.references(() => recipes.id)
		.unique()
});

export const mealsRelations = relations(meals, ({ one }) => ({
	recipe: one(recipes, {
		fields: [meals.recipeId],
		references: [recipes.id]
	})
}));

export const recipes = sqliteTable("recipes", {
	id: text("id").primaryKey(),
	name: text("name"),
	url: text("url")
});

export const recipesRelations = relations(recipes, ({ many }) => ({
	ingredientsToListsToRecipes: many(ingredientsToListsToRecipes),
	meals: many(meals)
}));

export const ingredients = sqliteTable("ingredients", {
	id: text("id").primaryKey(),
	name: text("name"),
	locked: integer("locked", { mode: "boolean" }).default(false)
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
	ingredientsToListsToRecipes: many(ingredientsToListsToRecipes)
}));

export const lists = sqliteTable("lists", {
	id: text("id").primaryKey(),
	name: text("name")
});

export const listsRelations = relations(ingredients, ({ many }) => ({
	ingredientsToListsToRecipes: many(ingredientsToListsToRecipes)
}));

export const ingredientsToListsToRecipes = sqliteTable(
	"ingredientsToListsToRecipes",
	{
		ingredientId: text("ingredientId")
			.notNull()
			.references(() => ingredients.id),
		listId: text("listId").references(() => lists.id),
		recipeId: text("recipeId")
			.notNull()
			.references(() => recipes.id),
		deleted: integer("deleted", { mode: "boolean" }).default(false),
		completed: integer("completed", { mode: "boolean" }).default(false)
	},
	(t) => ({
		pk: primaryKey(t.ingredientId, t.recipeId)
	})
);

export const ingredientsToListsToRecipesRelations = relations(
	ingredientsToListsToRecipes,
	({ one }) => ({
		ingredient: one(ingredients, {
			fields: [ingredientsToListsToRecipes.ingredientId],
			references: [ingredients.id]
		}),
		list: one(lists, {
			fields: [ingredientsToListsToRecipes.listId],
			references: [lists.id]
		}),
		recipe: one(recipes, {
			fields: [ingredientsToListsToRecipes.recipeId],
			references: [recipes.id]
		})
	})
);
