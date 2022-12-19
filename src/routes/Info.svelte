<script lang="ts">
	import { onMount } from 'svelte';
	import { appInfo } from '$lib/stores';
	import { BuildTime } from '../build';

	let overlay: HTMLDivElement;

	let show = false;
	appInfo.subscribe((v) => (show = v));

	onMount(() => {
		document.onclick = (e) => {
			if (e.target === overlay && show) appInfo.set(false);
		};
	});
</script>

{#if show}
	<div class="overlay" bind:this={overlay}>
		<div class="container">
			<h2 class="title">Saigonese Coffee</h2>
			<!-- svelte-ignore missing-declaration -->
			<div class="last-update">
				Cập nhật lần cuối {new Intl.DateTimeFormat('vi-VN').format(new Date(BuildTime))}
			</div>
			<div class="row">
				Tác giả: <a
					class="link"
					target="_blank"
					rel="noreferrer"
					href="https://twitter.com/MonodyLe"
				>
					@monodyle
				</a>
			</div>
			<div class="row">
				Open source: <a
					class="link"
					target="_blank"
					rel="noreferrer"
					href="https://github.com/monodyle/saigonese.cafe"
				>
					monodyle/saigonese.cafe
				</a>
			</div>
		</div>
	</div>
{/if}

<style scoped>
	.overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.container {
		width: 96vw;
		max-width: 480px;
		top: 64px;
		background-color: var(--color-white);
		border: 1px solid var(--color-border);
		padding: 24px 48px;
		border-radius: 8px;
	}

	.title {
		text-align: center;
		font-weight: 600;
		font-size: 24px;
		margin-top: 0;
		margin-bottom: 4px;
	}

	.last-update {
		text-align: center;
		font-size: 14px;
		color: var(--color-muted);
		margin-bottom: 16px;
	}

	.row {
		color: var(--color-muted);
		margin-bottom: 4px;
	}
	.row .link {
		color: var(--color-text);
		text-decoration: none;
		display: inline-block;
		border-bottom: 1px dashed;
		font-weight: 500;
	}
</style>
