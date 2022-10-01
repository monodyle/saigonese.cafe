<script lang="ts">
  import Map from "./lib/map.svelte";
    import Preview from "./lib/preview.svelte";
  import { city, current, filter, geo, rawData, type CafeShop } from "./store";

  let cityValue: string = "";
  let filterValue: string;
  let data: any;
  let filteredGeo: any;

  city.subscribe((value) => {
    cityValue = value;
    data = rawData[value];
  });

  filter.subscribe((value) => {
    filterValue = value
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
  current.subscribe((value) => currentValue = value)
</script>

<main>
  <Map city={cityValue} {data} geo={filteredGeo} filter={filterValue} />
  {#if currentValue !== null}
    <Preview current={currentValue} />
  {/if}
</main>

<style scoped>
  main {
    width: 100vw;
    height: 100vh;
  }
</style>
