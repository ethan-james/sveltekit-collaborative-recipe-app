<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<form method="POST" action="?/insert">
	<fieldset>
		<textarea
			id="ingredients"
			name="ingredients"
			placeholder="Ingredients (comma-separated or one per line)"
		></textarea>
		{@render children?.()}
		<button>Add Ingredients</button>
	</fieldset>
</form>

<style>
	button {
		@apply btn btn-primary;
	}

	textarea {
		height: 10rem;
		@apply textarea textarea-bordered;
	}
</style>
