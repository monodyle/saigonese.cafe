<script lang="ts">
  import { emitter } from "../../event";

  import { loc, shop as current, type CafeShop } from "../../store";
  import { getDistanceFromMe } from "../../utils";

  export let shop: CafeShop;
  let myLoc: [number, number] = null;
  loc.subscribe((v) => (myLoc = v));

  const image = shop.properties["image"];
  const name = shop.properties["name"];
  const address = shop.properties["address"];
  const distance = getDistanceFromMe(shop.coordinates, myLoc);

  const handleClick = () => {
    current.set(shop);
    emitter.emit("fly-to", {
      center: [shop.coordinates[0], shop.coordinates[1]],
      zoom: 17,
      speed: 1.5,
    });
  };
</script>

<div class="item" on:click={handleClick}>
  <div class="preview">
    <img src={image} alt={name} />
  </div>
  <div class="info">
    <div class="name">{name}</div>
    <div class="address">{address}{distance && "・" + distance}</div>
  </div>
</div>

<style scoped>
  .item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.24s ease;
  }
  .item:hover {
    background-color: var(--color-neutral-100);
  }
  .preview {
    width: 48px;
    height: 48px;
    overflow: hidden;
    border-radius: 4px;
  }
  .preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .info {
    flex: 1;
  }
  .name {
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
  }
  .address {
    font-size: 11px;
    line-height: 12px;
    color: var(--color-neutral-500);
  }
</style>
