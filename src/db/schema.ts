import { boolean, integer, serial, text, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const recipes = pgTable("recipes", {
	id: serial("id").primaryKey(),
	name: text("name"),
	url: text("url")
});

export const recipesRelations = relations(recipes, ({ many }) => ({
	ingredientsToRecipes: many(ingredientsToRecipes),
	ingredientsToListsToRecipes: many(ingredientsToListsToRecipes)
}));

export const ingredients = pgTable("ingredients", {
	id: serial("id").primaryKey(),
	name: text("name")
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
	ingredientsToListsToRecipes: many(ingredientsToListsToRecipes),
	ingredientsToRecipes: many(ingredientsToRecipes)
}));

export const ingredientsToRecipes = pgTable(
	"ingredientsToRecipes",
	{
		ingredientId: integer("ingredientId")
			.notNull()
			.references(() => ingredients.id),
		recipeId: integer("recipeId")
			.notNull()
			.references(() => recipes.id)
	},
	(t) => ({
		pk: primaryKey(t.ingredientId, t.recipeId)
	})
);

export const ingredientsToRecipesRelations = relations(ingredientsToRecipes, ({ one }) => ({
	ingredient: one(ingredients, {
		fields: [ingredientsToRecipes.ingredientId],
		references: [ingredients.id]
	}),
	recipe: one(recipes, {
		fields: [ingredientsToRecipes.recipeId],
		references: [recipes.id]
	})
}));

export const lists = pgTable("lists", {
	id: serial("id").primaryKey(),
	name: text("name")
});

export const listsRelations = relations(ingredients, ({ many }) => ({
	ingredientsToListsToRecipes: many(ingredientsToListsToRecipes)
}));

export const ingredientsToListsToRecipes = pgTable(
	"ingredientsToListsToRecipes",
	{
		ingredientId: integer("ingredientId")
			.notNull()
			.references(() => ingredients.id),
		listId: integer("listId")
			.notNull()
			.references(() => lists.id),
		recipeId: integer("recipeId")
			.notNull()
			.references(() => recipes.id),
		completed: boolean("completed").default(false)
	},
	(t) => ({
		pk: primaryKey(t.ingredientId, t.listId, t.recipeId)
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
