<script lang="ts">
  import { createColorPoint } from "../utils";
  import { onMount } from "svelte";
  import { shop, loc } from "../store";
  import type mapboxgl from "mapbox-gl";
  import { emitter } from "../event";

  export let region: string;
  export let filter: string;
  export let geo: any;
  export let data: any;

  let last = "";
  let lastFilter = "";

  let mapContainer: HTMLDivElement;
  let map: mapboxgl.Map;
  let geoControl: mapboxgl.GeolocateControl;

  const SCALE = 10;

  const updateMap = () => {
    if (last !== region) {
      map.flyTo({
        center: data.center,
        zoom: SCALE,
        speed: 2,
      });
    }
    if (lastFilter !== filter) {
      if (map.getLayer("layer")) map.removeLayer("layer");
      if (map.getLayer("clusters")) map.removeLayer("clusters");
      if (map.getLayer("clusters-count")) map.removeLayer("clusters-count");
      if (map.getLayer("source")) map.removeLayer("source");
      map.addSource("source", {
        type: "geojson",
        data: geo,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 25,
      });
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "source",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#d3cdc0",
          "circle-stroke-color": "#a59a83",
          "circle-stroke-width": 1,
          "circle-radius": 10,
        },
      });
      map.addLayer({
        id: "clusters-count",
        type: "symbol",
        source: "source",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
          "text-allow-overlap": true,
        },
        paint: {
          "text-color": "white",
        },
      });
      map.addLayer({
        id: "layer",
        type: "symbol",
        source: "source",
        layout: {
          "icon-image": ["get", "marker-symbol"],
          "icon-size": 1.2,
          "text-field": ["get", "name"],
          "text-size": 12,
          "text-offset": [0, 0.75],
          "text-anchor": "top",
          "icon-allow-overlap": true,
        },
        paint: {
          "text-color": "#5a5249",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
          "text-halo-blur": 0,
        },
      });
    }

    last = region;
    lastFilter = filter;
  };

  onMount(() => {
    window.map = map = new window.mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/monodyle/cl8q75kgo000515pfvutcf603",
      zoom: SCALE,
    });

    map.addControl(new window.MapboxLanguage({ defaultLanguage: "en" }));

    let marker = document.createElement("img");
    marker.setAttribute("src", "/favicon.svg");
    map.on("load", () => {
      map.addImage("cafe-shop", marker);
      // map.addImage("#F3AE1A", createColorPoint(255, 193, 7, 255));
      // map.addImage("#C24740", createColorPoint(194, 71, 64, 255));
      // map.addImage("#BEBEBE", createColorPoint(125, 125, 125, 255));

      updateMap();
    });

    map.on("click", "layer", (e) => {
      if (!e.features) return;
      const coordinates = e.features[0].geometry["coordinates"].slice();
      const properties = e.features[0].properties;
      shop.set({ coordinates, properties });
    });

    map.on("click", "clusters", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      if (!features.length) return;
      const clusterId = features[0].properties["cluster_id"];
      const geoSource = map.getSource("source");
      (geoSource as any).getClusterExpansionZoom(
        clusterId,
        (err: any, zoom: number) => {
          if (err) return;
          map.easeTo({
            center: features[0].geometry["coordinates"],
            zoom,
          });
        }
      );
    });

    map.on("mouseenter", "layer", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "layer", () => {
      map.getCanvas().style.cursor = "";
    });

    geoControl = new window.mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    });

    map.addControl(geoControl);

    emitter.on("track", () => geoControl.trigger());
    emitter.on("fly-to", (data: any) => map.flyTo(data));

    geoControl.on("geolocate", (e: any) => {
      loc.set([e.coords.longitude, e.coords.latitude]);
    });
  });
</script>

<div class="container">
  <div bind:this={mapContainer} class="map" />
</div>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .map {
    height: 100%;
    width: 100%;
    /* inset: 0; */
  }
</style>
