<script>
	export let data;
</script>

<h3>{data.list?.name}</h3>
<ul>
	{#each data.ingredients as { completed, id, name, recipeId }}
		<li>
			<form method="POST" action="?/complete">
				<button
					><label
						><input
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

<form method="POST" action="?/insert">
	<label for="ingredients">Ingredients (comma-separated or one per line)</label>
	<textarea id="ingredients" name="ingredients" />
	<input type="hidden" name="listId" value={data.list?.id} />
	<button>Add Ingredients</button>
</form>

<ul>
	{#each data.recipes as { id: recipeId, ingredients, name }}
		<li>
			<a href="/recipe/{recipeId}">{name}</a>
			{ingredients.filter((i) => i.completed).length / ingredients.length}
		</li>
		<ul>
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
		</ul>
	{/each}
</ul>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	textarea {
		height: 10rem;
	}

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
