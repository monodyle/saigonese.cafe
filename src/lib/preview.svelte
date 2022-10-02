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
    top: 64px;
    left: 24px;
    background-color: var(--color-neutral-50);
    border-radius: 12px;
    border: 1px solid var(--color-neutral-400);
    box-shadow: 0 -1px 2px 0 hsl(var(--shadow-color) /
            calc(var(--shadow-strength) + 2%)),
      0 2px 1px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),
      0 5px 5px -2px hsl(var(--shadow-color) / calc(var(--shadow-strength) + 3%)),
      0 10px 10px -2px hsl(var(--shadow-color) /
            calc(var(--shadow-strength) + 4%)),
      0 20px 20px -2px hsl(var(--shadow-color) /
            calc(var(--shadow-strength) + 5%)),
      0 40px 40px -2px hsl(var(--shadow-color) /
            calc(var(--shadow-strength) + 7%));
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
