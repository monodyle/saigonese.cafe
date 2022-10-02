<script lang="ts">
  import { emitter } from "../event";

  import Pin from "../icon/pin.svelte";
</script>

<div class="container">
  <button on:click={() => emitter.emit("track")}>
    <Pin />
  </button>
</div>

<style scoped>
  .container {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  button {
    background-color: var(--color-neutral-50);
    border: 1px solid var(--color-neutral-200);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    color: var(--color-neutral-700);
  }
  button:hover {
    background-color: var(--color-neutral-100);
  }
</style>
