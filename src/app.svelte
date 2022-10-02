<script lang="ts">
  import Control from "./lib/control.svelte";
  import Map from "./lib/map.svelte";
  import Preview from "./lib/preview.svelte";
  import Search from "./lib/search/search.svelte";
  import {
    region,
    current,
    filter,
    geo,
    rawData,
    type CafeShop,
  } from "./store";

  let regionValue: string = "";
  let filterValue: string;
  let data: any;
  let filteredGeo: any;

  region.subscribe((value) => {
    regionValue = value;
    data = rawData[value];
  });

  filter.subscribe((value) => {
    filterValue = value;
    if (value === "all") {
      filteredGeo = geo;
    } else {
      filteredGeo = {
        ...geo,
        features: (geo.features as any[]).filter(
          (i) => i.properties["marker-color"] === value
        ),
      };
    }
  });

  let currentValue: CafeShop | null = null;
  current.subscribe((value) => (currentValue = value));
</script>

<main>
  <Map region={regionValue} {data} geo={filteredGeo} filter={filterValue} />
  <Search />
  <Control />
  {#if currentValue !== null}
    <Preview current={currentValue} />
  {/if}
</main>

<style scoped>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
