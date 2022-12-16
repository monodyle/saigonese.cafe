<script lang="ts">
	import { region_map } from '$lib/config';
	import SearchIcon from '$lib/icons/search.svelte';
	import ClearIcon from '$lib/icons/clear.svelte';
	import {
		appInfo,
		fuseByName,
		fuseByNameWithRegion,
		rawData,
		region,
		regions,
		searchString,
		type Regions
	} from '$lib/stores';
	import { emitter } from '$lib/event';

	import ChevronDown from '$lib/icons/chevron-down.svelte';
	import { onMount } from 'svelte';
	import Item from './Item.svelte';
	import InfoIcon from '$lib/icons/info.svelte';

	let input: HTMLInputElement;
	let filter: HTMLButtonElement;
	let search = '';
	searchString.subscribe((v) => (search = v));
	let regionValue: Regions = 'sai-gon';
	region.subscribe((v) => (regionValue = v));

	$: result = fuseByName.search(search);
	$: resultByRegion =
		regionValue === 'sai-gon' ? result : fuseByNameWithRegion(regionValue).search(search);

	let selectingRegion = false;
	let toggleRegionSelection = () => (selectingRegion = !selectingRegion);

	let timer: NodeJS.Timeout;
	const debounce = (value: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			search = value;
			searchString.set(value);
		}, 600);
	};

	const handleChangeRegion = (regionValue: Regions) => {
		region.set(regionValue);
		selectingRegion = false;
		const center = rawData[regionValue].center;
		emitter.emit('fly-to', { center, zoom: 14, speed: 1.5 });
	};

	onMount(() => {
		document.onclick = (e) => {
			if (e.target !== filter) selectingRegion = false;
		};
	});
</script>

<header>
	<div class="search">
		<SearchIcon />
		<input
			type="text"
			placeholder="Search for Coffee..."
			class="input"
			bind:value={search}
			bind:this={input}
			on:keyup={({ currentTarget: { value } }) => debounce(value)}
		/>
		{#if search.length}
			<button class="clear" on:click={() => (search = '')}>
				<ClearIcon />
			</button>
		{/if}
	</div>
	{#if resultByRegion.length}
		<div class="search-result">
			{#each resultByRegion as { item }}
				<Item shop={item} />
			{/each}
		</div>
	{/if}
	<div class="info">
		<button on:click={() => appInfo.set(true)}>
			<InfoIcon />
		</button>
	</div>
	<button class="filter" on:click={toggleRegionSelection} bind:this={filter}>
		<span class="label">{region_map[regionValue].name}</span>
		<div class="chevron"><ChevronDown /></div>
	</button>
	{#if selectingRegion}
		<div class="region-list">
			{#each regions as region}
				<button class="region-option" on:click={() => handleChangeRegion(region.key)}>
					{region.name}
				</button>
			{/each}
		</div>
	{/if}
</header>

<style scoped>
	header {
		display: flex;
		border-bottom: 1px solid var(--color-border);
	}

	.search {
		flex: 1;
		padding: 16px 32px;
		border-right: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.input {
		flex: 1;
		background-color: transparent;
		border: 0 none;
		line-height: 32px;
		font-size: 18px;
	}

	.input:focus-visible {
		outline: 0 none;
	}

	.clear {
		background-color: transparent;
		border: 0 none;
		cursor: pointer;
		opacity: 0.8;
	}

	.clear:hover {
		opacity: 1;
	}

	.search-result {
		background: var(--color-white);
		width: 100vw;
		position: absolute;
		top: 67px;
		left: 0;
		padding: 24px 24px 0;
	}

	.info {
		display: flex;
		align-items: center;
		border-right: 1px solid var(--color-border);
		gap: 12px;
		padding: 16px 32px;
	}
	.info > button {
		display: flex;
		align-items: center;
		cursor: pointer;
		background-color: transparent;
		border: 0 none;
	}

	.filter {
		background-color: var(--color-white);
		border: 0 none;
		font-size: 18px;
		width: 240px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 32px;
		gap: 16px;
		cursor: pointer;
		font-weight: 600;
	}

	.filter:hover {
		background-color: var(--color-border);
	}

	.filter > * {
		pointer-events: none;
	}

	.filter .chevron {
		opacity: 0.5;
	}

	.region-list {
		background: var(--color-white);
		width: 240px;
		position: absolute;
		top: 67px;
		right: 0;
		padding: 12px 12px 0;
	}

	.region-option {
		cursor: pointer;
		font-size: 16px;
		display: block;
		width: 100%;
		padding: 8px 16px;
		margin-bottom: 12px;
		background-color: var(--color-white);
		border: 0 none;
		text-align: left;
	}
	.region-option:hover {
		background-color: var(--color-border);
		border-radius: 4px;
	}
</style>
