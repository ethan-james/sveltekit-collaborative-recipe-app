<script>
	import "../app.css";
</script>

<div class="flex flex-col gap-12 p-16 pt-8">
	<!-- <h1 class="font-bold text-3xl text-center">Soup Squad</h1> -->
	<slot />
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
		@apply flex flex-col gap-2 form-control;
	}

	:global(input[type="text"]) {
		@apply input input-bordered;
	}
</style>
