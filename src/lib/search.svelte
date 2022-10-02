<script lang="ts">
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
</div>

<style scoped>
  .container {
    position: absolute;
    top: 24px;
    left: 24px;
  }
  input {
    display: block;
    width: 256px;
    padding: 8px 12px;
    background-color: var(--color-neutral-50);
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
