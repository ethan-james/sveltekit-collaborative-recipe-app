<script>
	import "../app.css";
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="flex flex-col gap-12 p-16 pt-8">
	<!-- <h1 class="font-bold text-3xl text-center">Soup Squad</h1> -->
	{@render children?.()}
</div>

<div class="btm-nav">
	<a href="/">Plan</a>
	<a href="/list/1">Shopping List</a>
	<a href="/recipe">Recipes</a>
</div>

<style lang="postcss">
	:global(a) {
		color: theme(colors.blue.700);
	}

	:global(fieldset) {
		@apply flex flex-col gap-2;
	}
</style>
