<script>
  import SpendingHeatmap from "../components/SpendingHeatmap.svelte"
  import EditEntries from "../components/EditEntries.svelte"
  import Icon from "../components/Icon.svelte"

  let currentSection = 'main'
</script>

<div class="datacenter">
  <div class="side-menu">
    <button on:click={() => currentSection = 'main'} class:selected={currentSection === 'main'}>
      <Icon name="datacenter" size={20} /> Main
    </button>
    <!-- trends and cash sections are not used right now -->
    <button on:click={() => currentSection = 'edit'} class:selected={currentSection === 'edit'}>
      <Icon name="settings" size={20} /> Edit Entries
    </button>
  </div>

  <div class="section-view">
    {#if currentSection === 'main'}
      <h1>Overview</h1>
      <SpendingHeatmap />
    {:else if currentSection === 'trends'}
      <h1>Trends</h1>
      <p>Charts go here</p>
    {:else if currentSection === 'cash'}
      <h1>Cashflow</h1>
      <p>Cashflow details go here</p>
    {:else if currentSection === 'edit'}
      <EditEntries />
    {/if}
  </div>
</div>

<style>
  .datacenter {
    display: flex;
    height: 100%;
    background: var(--background, #f9f9f9);
    color: var(--text, #000);
  }

  .side-menu {
    width: 200px;
    background: var(--secondary, #fff);
    border-right: 1px solid var(--border, #ccc);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
  }

  .side-menu button {
    border: none;
    background: none;
    padding: .75rem 1rem;
    text-align: left;
    cursor: pointer;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: .5rem;
    color: var(--text, #000);
  }

  .side-menu button:hover,
  .side-menu button.selected {
    background: var(--primary, #e0e0e0);
    font-weight: bold;
  }

  .section-view {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  :global(.dark .datacenter) {
    background: var(--dark-background, #121212);
    color: var(--dark-text, #eee);
  }

  :global(.dark .side-menu) {
    background: var(--dark-secondary, #1e1e1e);
    border-right: 1px solid var(--dark-border, #333);
  }

  :global(.dark .side-menu button) {
    color: var(--dark-text, #eee);
  }

  :global(.dark .side-menu button:hover),
  :global(.dark .side-menu button.selected) {
    background: #0077cc;
    color: #fff;
  }
</style>
