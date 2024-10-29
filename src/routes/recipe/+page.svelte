<script>
	let { data } = $props();
</script>

<ul>
	{#each data.recipes as recipe}
		<li><a href="/recipe/{recipe.id}"><strong>{recipe.name}</strong> ({recipe.url})</a></li>
	{/each}
</ul>

<form method="POST">
	<fieldset>
		<legend class="p-4"> New Recipe </legend>
		<input name="name" placeholder="Name" type="text" />
		<input name="url" placeholder="URL" type="text" />
		<button class="btn btn-primary">Create Recipe</button>
	</fieldset>
</form>
