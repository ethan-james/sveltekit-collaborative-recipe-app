<script>
	import { Button } from "@/components/ui/button";
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
		<Button>Add Ingredients</Button>
	</fieldset>
</form>

<style>
	textarea {
		height: 10rem;
		@apply textarea textarea-bordered;
	}
</style>
