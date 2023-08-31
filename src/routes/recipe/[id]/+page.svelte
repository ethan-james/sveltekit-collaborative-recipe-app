<script>
	export let data;
</script>

<h3>{data.recipe?.name}</h3>
<ul>
	{#each data.ingredients as ingredient}
		<li>{ingredient.name}</li>
	{/each}
</ul>

<form method="POST">
	<label for="ingredients">Ingredients (comma-separated or one per line)</label>
	<textarea id="ingredients" name="ingredients" />
	<input type="hidden" name="recipeId" value={data.recipe?.id} />
	<button>Add Ingredients</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	textarea {
		height: 10rem;
	}
</style>
