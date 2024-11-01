<script>
	import { Input } from "@/components/ui/input";
	let { data } = $props();
</script>

<ul>
	{#each data.lists as list}
		<li><a href="/list/{list.id}">{list.name}</a></li>
	{/each}
</ul>

<form method="POST">
	<label>
		Name
		<Input name="name" />
	</label>
	<button>Create List</button>
</form>
