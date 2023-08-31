<script>
	export let data;
</script>

<ul>
	{#each data.recipes as recipe}
		<li><a href="/recipe/{recipe.id}"><strong>{recipe.name}</strong> ({recipe.url})</a></li>
	{/each}
</ul>

<form method="POST">
	<label>
		Name
		<input name="name" />
	</label>
	<label>
		URL
		<input name="url" />
	</label>
	<button>Create Recipe</button>
</form>
