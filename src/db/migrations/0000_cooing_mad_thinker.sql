CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredientsToListsToRecipes" (
	"ingredientId" integer NOT NULL,
	"listId" integer NOT NULL,
	"recipeId" integer NOT NULL,
	CONSTRAINT ingredientsToListsToRecipes_ingredientId_listId_recipeId PRIMARY KEY("ingredientId","listId","recipeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredientsToRecipes" (
	"ingredientId" integer NOT NULL,
	"recipeId" integer NOT NULL,
	CONSTRAINT ingredientsToRecipes_ingredientId_recipeId PRIMARY KEY("ingredientId","recipeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"url" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredientsToListsToRecipes" ADD CONSTRAINT "ingredientsToListsToRecipes_ingredientId_ingredients_id_fk" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredientsToListsToRecipes" ADD CONSTRAINT "ingredientsToListsToRecipes_listId_lists_id_fk" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredientsToListsToRecipes" ADD CONSTRAINT "ingredientsToListsToRecipes_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredientsToRecipes" ADD CONSTRAINT "ingredientsToRecipes_ingredientId_ingredients_id_fk" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredientsToRecipes" ADD CONSTRAINT "ingredientsToRecipes_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
