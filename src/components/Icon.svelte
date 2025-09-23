<script>
  export let name = "home"
  export let size = 24
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  class="icon"
  style="width: {size}px; height: {size}px"
>
  {#if name === "home"}
    <path d="M3 9.5L12 3l9 6.5v11.5H3z" />
  {:else if name === "profile"}
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
  {:else if name === "settings"}
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.9 7.9l-1.4-1.4M6.5 6.5L5.1 5.1m12.8 0l-1.4 1.4M6.5 17.5l-1.4 1.4" />
  {:else if name === "datacenter"}
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 10h16M10 4v16" />
  {:else if name === "hand"}
    <path d="M12 2l1 4-2 1 1 5-2 1 1 6h2l2-6 2-1-2-5 2-1-1-4z" />
  {:else if name === "wallet"}
    <path d="M3 7h18v10H3z" />
    <path d="M16 12h4" />
  {:else if name === "bank"}
    <path d="M12 2l9 4v2H3V6l9-4z" />
    <path d="M3 10h18v10H3z" />
  {:else if name === "target"}
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="2" />
  {:else if name === "check"}
    <path d="M20 6L9 17l-5-5" />
  {:else if name === "arrow-down"}
    <path d="M12 5v14m-7-7l7 7 7-7" />
  {:else if name === "custom"}
    <path d="M12 2l4 20-4-4-4 4 4-20z" />
  {/if}
</svg>

<style>
  .icon {
    stroke-width: 2;
    stroke: currentColor;
    fill: none;
  }
</style>
