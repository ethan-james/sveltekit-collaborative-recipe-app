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
		<Textarea
			id="ingredients"
			name="ingredients"
			placeholder="Ingredients (comma-separated or one per line)"
		></Textarea>
		{@render children?.()}
		<Button>Add Ingredients</Button>
	</fieldset>
</form>
