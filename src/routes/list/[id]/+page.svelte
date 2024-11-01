<script>
	import { Checkbox } from "@/components/ui/checkbox";
	import { Progress } from "@/components/ui/progress";
	import AddIngredients from "@/components/AddIngredients.svelte";

	let { data } = $props();
</script>

<h3>{data.list?.name}</h3>
<ul>
	{#each data.ingredients as { completed, id, name, recipeId }}
		<li>
			<form method="POST" action="?/complete">
				<button
					><label
						><Checkbox
							name="completed"
							type="checkbox"
							bind:checked={completed}
							value="true"
						/>{name}</label
					></button
				>
				<input type="hidden" name="ingredientId" value={id} />
				<input type="hidden" name="listId" value={data.list?.id} />
				<input type="hidden" name="recipeId" value={recipeId} />
			</form>
		</li>
	{/each}
</ul>

{#if data.list}
	<AddIngredients>
		<input type="hidden" name="listId" value={data.list.id} />
	</AddIngredients>
{/if}

<ul>
	{#each data.recipes as { id: recipeId, ingredients, name }}
		<li class="flex flex-col gap-2">
			<a href="/recipe/{recipeId}">{name}</a>
			<Progress max="1" value={ingredients.filter((i) => i.completed).length / ingredients.length}
			></Progress>

			<!-- <ul>
				{#each ingredients as { completed, id: ingredientId, name }}
					<li>
						{#if data.ingredients.find((i) => i.id === ingredientId)}
							{completed ? "✓" : "☐"} {name}
						{:else}
							<form method="POST" action="?/insert">
								<input type="hidden" name="ingredients" value={name} />
								<input type="hidden" name="listId" value={data.list?.id} />
								<input type="hidden" name="recipeId" value={recipeId} />
								<button>{name}</button>
							</form>
						{/if}
					</li>
				{/each}
			</ul> -->
		</li>
	{/each}
</ul>

<style>
	li {
		display: flex;
		gap: 0.5rem;
		margin: 0.5rem 0;
		padding: 0 0 0 1rem;
	}

	li label {
		display: flex;
		gap: 0.5rem;
	}
</style>
