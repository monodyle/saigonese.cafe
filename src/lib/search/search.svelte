<script lang="ts">
  import {
    filter,
    fuseByName,
    rawData,
    region,
    regions,
    type Regions,
  } from "../../store";
  import hotkeys from "hotkeys-js";
  import Item from "./item.svelte";
  import { emitter } from "../../event";

  let input: HTMLInputElement = null;
  let search = "";
  let regionValue: Regions = "district-1";

  region.subscribe((v) => (regionValue = v));
  $: result = fuseByName.search(search);

  hotkeys("ctrl+k, command+k", (e) => {
    e.preventDefault();
    input?.focus();
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") input?.blur();
  };

  let timer: NodeJS.Timeout;
  const debounce = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      search = value;
      filter.set(value);
    }, 600);
  };

  const handleChangeRegion = () => {
    console.log(regionValue);
    region.set(regionValue);
    const center = rawData[regionValue].center;
    emitter.emit("fly-to", {
      center,
      zoom: 14,
      speed: 1.5,
    });
  };
</script>

<div class="container">
  <div class="filter">
    <select bind:value={regionValue} on:change={handleChangeRegion}>
      {#each regions as region}
        <option value={region.key}>{region.name}</option>
      {/each}
    </select>
    <input
      type="text"
      on:keyup={({ currentTarget: { value } }) => debounce(value)}
      placeholder="Search for place..."
      bind:this={input}
      on:keydown={handleKeydown}
    />
  </div>
  {#if result.length}
    <div class="result">
      {#each result as value}
        <Item shop={value.item} />
      {/each}
    </div>
  {/if}
</div>

<style scoped>
  .container {
    position: absolute;
    top: 24px;
    left: 24px;
  }
  .filter {
    display: flex;
    gap: 8px;
  }
  .result {
    border-radius: 8px;
    margin-top: 8px;
    border: 1px solid var(--color-neutral-300);
    background-color: var(--color-neutral-50);
    padding: 4px;
  }
  select {
    border: 1px solid var(--color-neutral-300);
    background-color: var(--color-neutral-50);
    box-shadow: var(--shadow-4);
    padding: 8px;
    border-radius: 8px;
  }
  input {
    display: block;
    width: 256px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--color-neutral-300);
    background-color: var(--color-neutral-50);
    box-shadow: var(--shadow-4);
  }
  input:focus,
  input:focus-visible {
    outline: 2px solid var(--color-neutral-300);
  }
</style>
