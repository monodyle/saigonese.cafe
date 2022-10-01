<script lang="ts">
  import type { CafeShop } from "src/store";

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
    --shadow-color: 0 0% 45%;
    --shadow-strength: 1%;
    display: flex;
    gap: 8px;
    padding: 8px;
    padding-right: 16px;
    position: absolute;
    bottom: 24px;
    left: 24px;
    background-color: #fafafa;
    border-radius: 8px;
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
    width: 72px;
    height: 72px;
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
    color: #404040;
    font-weight: 600;
  }
  .address, .open_time {
    color: #737373;
    font-size: 12px;
    line-height: 16px;
  }
</style>
