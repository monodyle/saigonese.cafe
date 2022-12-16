<script lang="ts">
	import { emitter } from '../event';
	import Location from '../icons/location.svelte';
</script>

<div class="container">
	<button on:click={() => emitter.emit('track')}>
		<Location />
	</button>
</div>

<style scoped>
	.container {
		position: absolute;
		bottom: 24px;
		right: 24px;
	}
	button {
		background-color: var(--color-white);
		border: 1px solid var(--color-border);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		cursor: pointer;
		color: var(--color-text);
	}

	button:hover {
		background-color: var(--color-border);
	}
</style>
