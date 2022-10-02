<script lang="ts">
  import { filter } from "../store";
  import hotkeys from "hotkeys-js";

  let display = false;
  let input: HTMLInputElement = null;

  const hideSearchBar = () => {
    display = false;
    input?.blur();
  };

  const clickOutside = (node: HTMLDivElement) => {
    const handleClick = (e: any) => {
      if (node && !node.contains(e.target)) hideSearchBar();
    };
    document.addEventListener("click", handleClick, true);
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") hideSearchBar();
  };

  let timer: NodeJS.Timeout;
  const debounce = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => filter.set(value), 600);
  };

  hotkeys("ctrl+k, command+k", (e) => {
    e.preventDefault();
    display = true;
    input?.focus();
  });
</script>

<div class="container" class:block={display} use:clickOutside>
  <input
    type="text"
    on:keyup={({ currentTarget: { value } }) => debounce(value)}
    placeholder="Search for place..."
    bind:this={input}
    on:keydown={handleKeydown}
  />
</div>

<style scoped>
  .container {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 24px;
    left: 24px;
  }
  .block {
    opacity: 1;
    pointer-events: all;
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
