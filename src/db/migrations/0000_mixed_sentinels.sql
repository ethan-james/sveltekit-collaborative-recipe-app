CREATE TABLE `ingredients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`locked` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `ingredientsToListsToRecipes` (
	`ingredientId` text NOT NULL,
	`listId` text,
	`recipeId` text NOT NULL,
	`deleted` integer DEFAULT false,
	`completed` integer DEFAULT false,
	PRIMARY KEY(`ingredientId`, `recipeId`),
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`listId`) REFERENCES `lists`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `meals` (
	`id` text PRIMARY KEY NOT NULL,
	`scheduled` integer,
	`recipeId` text NOT NULL,
	FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`url` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `meals_recipeId_unique` ON `meals` (`recipeId`);