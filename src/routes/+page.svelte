<script lang="ts">
	import Control from '$lib/control/Control.svelte';
	import Map from '$lib/map/Map.svelte';
	import Preview from '$lib/map/Preview.svelte';
	import { filter, geo, rawData, region } from '$lib/stores';
	import Info from './Info.svelte';

	let regionValue: string = '';
	let filterValue: string;
	let data: any;
	let filteredGeo: any;

	region.subscribe((value) => {
		regionValue = value;
		data = rawData[value];
	});

	filter.subscribe((value) => {
		filterValue = value;
		if (value === 'all') {
			filteredGeo = geo;
		} else {
			filteredGeo = {
				...geo,
				features: (geo.features as any[]).filter(
					(i) => i.properties['marker-color'] === value
				)
			};
		}
	});
</script>

<svelte:head>
	<title>Saigonese Coffee</title>
	<meta name="description" content="Are you looking for coffee on weekends?" />
</svelte:head>

<section>
	<Map region={regionValue} {data} geo={filteredGeo} filter={filterValue} />
	<Preview />
	<Control />
	<Info />
</section>

<style>
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
