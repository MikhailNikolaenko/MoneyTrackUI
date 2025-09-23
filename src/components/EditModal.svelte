<script>
  import { createEventDispatcher } from "svelte"
  import Icon from "../components/Icon.svelte"

  export let entry = null
  export let type = ""

  const dispatch = createEventDispatcher()
  let localEntry = null

  function toDateOnly(val) {
    if (!val) return ""
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val
    const d = new Date(val)
    if (isNaN(d.getTime())) return ""
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }

  $: localEntry = entry ? { ...entry, date: toDateOnly(entry.date) } : null

  function save() {
    if (localEntry) dispatch("save", localEntry)
  }

  function close() {
    dispatch("close")
  }
</script>

{#if entry}
  <div
    class="modal-backdrop"
    tabindex="0"
    on:click={close}
    on:keydown={(e) => e.key === "Escape" && close()}
  >
    <div class="modal" on:click|stopPropagation>
      <h2>Edit {type}</h2>

      <label>
        Name:
        <input type="text" bind:value={localEntry.purchaseName} />
      </label>

      {#if type !== "paycheck"}
        <label>
          Category:
          <input type="text" bind:value={localEntry.category} />
        </label>
      {/if}

      <label>
        Amount:
        <input type="number" bind:value={localEntry.price} />
      </label>

      <label>
        Date:
        <input type="date" bind:value={localEntry.date} />
      </label>

      <div class="actions">
        <button on:click={save}>
          <Icon name="check" size={16} /> Save
        </button>
        <button on:click={close}>
          <Icon name="arrow-down" size={16} /> Cancel
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: var(--secondary, #fff);
    padding: 1.2rem;
    border-radius: 8px;
    min-width: 280px;
    color: var(--text, #000);
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: .7rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: .5rem;
  }
</style>
