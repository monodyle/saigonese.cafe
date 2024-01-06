<script lang="ts">
	import Control from '$lib/control/Control.svelte';
	import Map from '$lib/map/Map.svelte';
	import Preview from '$lib/map/Preview.svelte';
	import { category, geo, geoByRegion, rawData, region } from '$lib/stores';
	import Info from './Info.svelte';

	let regionValue: string = '';
	let filterValue: string;
	let data: any;
	let filteredGeo: any = geo;

	region.subscribe((value) => {
		regionValue = value;
		filteredGeo = geoByRegion(value);
		data = rawData[value];
	});
	const filterByCategory = (filterValue: string) => {
		const value = filterValue;
		if (value === 'all') {
			return geo
		} else {
			return {
				...geo,
				features: (geo.features as any[]).filter(
					(i) => i.properties['category'] === value
				)
			};
		}
	}
	category.subscribe((value) => {
		filterValue = value;
		filteredGeo = filterByCategory(value);
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
