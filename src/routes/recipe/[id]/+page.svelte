<script>
	import { DateInput } from "date-picker-svelte";
	import { tick } from "svelte";
	import Fa from "svelte-fa";
	import { faMinusSquare, faPlusSquare, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
	import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
	import { Status } from "../../../db/ingredients";
	import AddIngredients from "../../../components/AddIngredients.svelte";

	export let data;
	let date = data.meal?.scheduled ? new Date(data.meal?.scheduled) : null;
	/**
	 * @type {HTMLFormElement}
	 */
	let form;

	const formatter = new Intl.DateTimeFormat("fr-CA");

	const getStatusIcon = (/** @type {Status} */ status) => {
		switch (status) {
			case Status.None:
				return "•";
			case Status.Missing:
				return "☐";
			case Status.Completed:
				return "✓";
		}
	};

	$: date &&
		date.toISOString().slice(0, 10) !== data.meal?.scheduled &&
		tick().then(() => form?.requestSubmit());
</script>

<main>
	<section>
		<header>
			<form method="POST" action="?/schedule">
				<input type="hidden" name="id" value={data.recipe?.id} />
				<input type="hidden" name="scheduled" value={null} />
				<button>✗</button>
			</form>
			<form method="POST" action="?/schedule" bind:this={form}>
				<DateInput bind:value={date} closeOnSelection format="MM/dd" placeholder="Schedule Meal" />
				<input type="hidden" name="id" value={data.recipe?.id} />
				<input type="hidden" name="scheduled" value={date ? formatter.format(date) : null} />
			</form>
			<h3>{data.recipe?.name}</h3>
		</header>
		<aside>
			<a href={data.recipe?.url} title="View →" target="_blank">View →</a>
		</aside>
		{#if data.ingredients.length}
			<footer>
				<ul>
					{#each data.ingredients as { id, locked, name, status }}
						<li>
							<span>{getStatusIcon(status)} {name}</span>
							<div class="btn-row">
								{#if !locked}
									{#if status == Status.None}
										<form method="POST" action="?/addIngredientToShoppingList">
											<input type="hidden" name="ingredientId" value={id} />
											<input type="hidden" name="listId" value="1" />
											<input type="hidden" name="recipeId" value={data.recipe?.id} />
											<button>
												<Fa class="cursor-pointer text-green-600" icon={faPlusSquare} />
											</button>
										</form>
									{:else}
										<form method="POST" action="?/removeIngredientFromShoppingList">
											<input type="hidden" name="ingredientId" value={id} />
											<input type="hidden" name="listId" value="1" />
											<input type="hidden" name="recipeId" value={data.recipe?.id} />
											<button>
												<Fa class="cursor-pointer text-remove-600" icon={faMinusSquare} />
											</button>
										</form>
									{/if}
								{/if}
								{#if locked}
									<form method="POST" action="?/unlockIngredient">
										<input type="hidden" name="ingredientId" value={id} />
										<button>
											<Fa class="cursor-pointer text-blue-600" icon={faLock} />
										</button>
									</form>
								{:else}
									<form method="POST" action="?/lockIngredient">
										<input type="hidden" name="ingredientId" value={id} />
										<button>
											<Fa class="cursor-pointer text-slate-200" icon={faLockOpen} />
										</button>
									</form>
								{/if}
								<form method="POST" action="?/removeIngredientFromRecipe">
									<input type="hidden" name="ingredientId" value={id} />
									<input type="hidden" name="recipeId" value={data.recipe?.id} />
									<button>
										<Fa class="cursor-pointer text-red-600" icon={faXmarkCircle} />
									</button>
								</form>
							</div>
						</li>
					{/each}
				</ul>
			</footer>
		{/if}
	</section>
</main>

{#if data.recipe}
	<AddIngredients>
		<input type="hidden" name="recipeId" value={data.recipe.id} />
	</AddIngredients>
{/if}

<style lang="postcss">
	:global(header .date-time-field input) {
		border: 0;
		display: inline;
	}

	main {
		@apply card card-bordered;
	}

	section {
		@apply card-body;
	}

	header {
		@apply border-gray-200 card-title;
	}

	aside {
		@apply bg-gray-200 flex justify-end p-2 rounded-lg -translate-y-2;
	}

	footer {
		@apply card-body;
	}

	ul {
		@apply border-t border-gray-200;
	}

	ul li {
		@apply border-b border-gray-200 flex items-center justify-between list-none px-2 py-1;
	}

	ul li form {
		@apply flex items-center;
	}

	.btn-row {
		@apply flex gap-4 whitespace-nowrap;
	}
</style>
