<script>
  export let title = "";
  export let content = "";
</script>

<div class="card">
  {#if title}
    <h2>{title}</h2>
  {/if}

  {#if content}
    <p>{content}</p>
  {/if}

  <slot></slot>
</div>

<style>
  .card {
    background: var(--secondary, #fff);
    border-radius: 12px;
    padding: 1.2rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    color: var(--text, #000);
  }

  .card:hover {
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }

  :global(.dark .card) {
    background: var(--dark-secondary, #1e1e1e);
    color: var(--dark-text, #eee);
  }

  h2 {
    margin: 0 0 .5rem 0;
    color: var(--primary, inherit);
    font-size: 1.2rem;
  }

  p {
    margin: .25rem 0;
    line-height: 1.4;
  }
</style>
