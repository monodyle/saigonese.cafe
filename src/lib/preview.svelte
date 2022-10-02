<script lang="ts">
  import type { CafeShop } from "../store";

  export let current: CafeShop;
</script>

<div class="container">
  <div class="cover">
    <img src={current.properties["image"]} alt={current.properties["name"]} />
  </div>
  <div class="info">
    <div class="name">{current.properties["name"]}</div>
    <div class="address">{current.properties["address"]}</div>
    <div class="open_time">{current.properties["open_time"]}</div>
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
  .address,
  .open_time {
    color: var(--color-neutral-500);
    font-size: 12px;
    line-height: 16px;
  }
</style>
