<script lang="ts">
  import Banknotes from "../icon/banknotes.svelte";
  import type { CafeShop } from "../store";

  export let current: CafeShop;
</script>

<div class="container">
  <div class="cover">
    <img src={current.properties["image"]} alt={current.properties["name"]} />
  </div>
  <div class="info">
    <div class="name">{current.properties["name"]}</div>
    <div class="small">{current.properties["address"]}</div>
    <div class="small">{current.properties["open_time"]}</div>
    <div class="small price">
      <Banknotes />
      {current.properties["proposed_price"]}
    </div>
  </div>
</div>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    position: absolute;
    bottom: 48px;
    left: 24px;
    border-radius: 12px;
    background-color: var(--color-neutral-50);
    border: 1px solid var(--color-neutral-300);
    box-shadow: var(--shadow-5);
    width: 256px;
  }
  .cover {
    width: 100%;
    height: 128px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .name {
    color: var(--color-neutral-600);
    font-weight: 600;
  }
  .small {
    color: var(--color-neutral-500);
    font-size: 12px;
    line-height: 16px;
  }
  .price {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 2px;
  }
</style>
