<script lang="ts">
  import { emitter } from "../event";

  import Pin from "../icon/pin.svelte";
  import { filter } from "../store";

  let timer: NodeJS.Timeout;
  const debounce = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => filter.set(value), 600);
  };

  filter.subscribe(console.log);
</script>

<div class="container">
  <input
    type="text"
    on:keyup={({ currentTarget: { value } }) => debounce(value)}
    placeholder="Search for place..."
  />
  <button on:click={() => emitter.emit("track")}>
    <Pin />
  </button>
</div>

<style scoped>
  .container {
    display: flex;
    gap: 16px;
    padding: 0 16px;
    align-items: center;
    height: 48px;
    background-color: var(--color-neutral-50);
  }
  input {
    padding: 4px;
    display: block;
    flex: 1;
    background-color: transparent;
    border: 0 none;
    border-radius: 4px;
  }
  input:focus,
  input:focus-visible {
    outline: 0 none;
  }
  button {
    background: transparent;
    border: 0 none;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--color-neutral-700);
  }
  button:hover {
    background-color: var(--color-neutral-200);
  }
</style>
