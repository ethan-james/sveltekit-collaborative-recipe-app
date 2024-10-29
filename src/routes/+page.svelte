<script>
	let { data } = $props();
</script>

{#if data.meals.length}
	<ul>
		{#each data.meals as { meals: { scheduled }, recipes: { id, name } }}<li>
				{scheduled} - <a href="/recipe/{id}">{name}</a>
			</li>{/each}
	</ul>
{/if}
