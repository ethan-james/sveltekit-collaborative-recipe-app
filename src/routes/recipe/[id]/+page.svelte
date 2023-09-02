<script>
	import { DateInput } from "date-picker-svelte";
	import { tick } from "svelte";
	import { recipes } from "../../../db/schema";

	export let data;
	let date = data.recipe?.scheduled && new Date(data.recipe?.scheduled);
	let form;

	$: date &&
		date.toISOString().slice(0, 10) !== data.recipe?.scheduled &&
		tick().then(() => form?.requestSubmit());
	// $: date =
</script>

<header>
	<form method="POST" action="?/schedule" bind:this={form}>
		<DateInput bind:value={date} closeOnSelection format="MM/dd" placeholder="Schedule Meal" />
		<input type="hidden" name="id" value={data.recipe?.id} />
		<input type="hidden" name="scheduled" value={date} />
	</form>
	<form method="POST" action="?/schedule">
		<input type="hidden" name="id" value={data.recipe?.id} />
		<input type="hidden" name="scheduled" value={null} />
		<button>✗</button>
	</form>
	<h3>{data.recipe?.name}</h3>
	<a href={data.recipe?.url} title="View →" target="_blank">View →</a>
</header>

<ul>
	{#each data.ingredients as ingredient}
		<li>{ingredient.name}</li>
	{/each}
</ul>

<form method="POST" action="?/insert">
	<label for="ingredients">Ingredients (comma-separated or one per line)</label>
	<textarea id="ingredients" name="ingredients" />
	<input type="hidden" name="recipeId" value={data.recipe?.id} />
	<button>Add Ingredients</button>
</form>

<style>
	:global(header .date-time-field input) {
		border: 0;
		display: inline;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-left: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	textarea {
		height: 10rem;
	}
</style>
