<script lang="ts">
  import {
    searchString,
    fuseByName,
    rawData,
    region,
    regions,
    type Regions,
  } from "../../store";
  import hotkeys from "hotkeys-js";
  import Item from "./item.svelte";
  import { emitter } from "../../event";
  import Time from "../../icon/time.svelte";

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
      searchString.set(value);
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
    <select
      class="focus"
      bind:value={regionValue}
      on:change={handleChangeRegion}
    >
      {#each regions as region}
        <option value={region.key}>{region.name}</option>
      {/each}
    </select>
    <input
      type="text"
      class="focus"
      bind:value={search}
      on:keyup={({ currentTarget: { value } }) => debounce(value)}
      placeholder="Search for place..."
      bind:this={input}
      on:keydown={handleKeydown}
    />
    {#if search.length}
      <button class="clear" on:click={() => (search = "")}>
        <Time size={16} />
      </button>
    {/if}
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
    position: relative;
    display: flex;
    gap: 8px;
  }
  .clear {
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 4px;
    background-color: transparent;
    border: 0 none;
    color: var(--color-neutral-400);
    cursor: pointer;
  }
  .clear:hover {
    color: var(--color-neutral-500);
  }
  .result {
    width: 348px;
    border-radius: 8px;
    margin-top: 8px;
    border: 1px solid var(--color-neutral-300);
    background-color: var(--color-neutral-50);
    padding: 4px;
  }
  select,
  input {
    border: 1px solid var(--color-neutral-300);
    background-color: var(--color-neutral-50);
    box-shadow: var(--shadow-4);
    border-radius: 8px;
    font-size: 12px;
  }
  select {
    width: 84px;
    padding: 8px;
  }
  input {
    display: block;
    width: 256px;
    padding: 8px 12px;
    padding-right: 32px;
  }
  .focus:focus,
  .focus:focus-visible {
    outline: 2px solid var(--color-indigo-500);
    outline-offset: 1px;
  }
</style>
