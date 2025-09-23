<script>
  import { userData } from "../stores/user.js"
  import {
    deletePurchase,
    deleteRecurring,
    deletePaycheck,
    updatePurchase,
    updateRecurring,
    updatePaycheck
  } from "../lib/userUtils.js"
  import EditModal from "./EditModal.svelte"

  $: purchases = $userData?.purchases || []
  $: recurring = $userData?.recurring || []
  $: paychecks = $userData?.paychecks || []

  let showAllPurchases = false
  let showAllRecurring = false
  let showAllPaychecks = false

  $: visiblePurchases = showAllPurchases ? purchases : purchases.slice(0, 10)
  $: visibleRecurring = showAllRecurring ? recurring : recurring.slice(0, 10)
  $: visiblePaychecks = showAllPaychecks ? paychecks : paychecks.slice(0, 10)

  let editingEntry = null
  let editingType = ""
</script>

<div class="edit-entries">
  <h2>Edit Entries</h2>

  <h3>One-Time Purchases</h3>
  {#if purchases.length > 0}
    <ul>
      {#each visiblePurchases as p (p.id)}
        <li>
          <div class="name">{p.purchaseName}</div>
          <div class="category">{p.category}</div>
          <div class="date">{new Date(p.date).toLocaleDateString()}</div>
          <div class="type">one-time</div>
          <div class="price">${p.price}</div>
          <div class="actions">
            <button class="edit-btn" on:click={() => { editingEntry = p; editingType = "purchase" }}>✏️</button>
            <button class="delete-btn" on:click={() => deletePurchase(p.id)}>🗑️</button>
          </div>
        </li>
      {/each}
    </ul>
    {#if purchases.length > 10}
      <button class="toggle-btn" on:click={() => showAllPurchases = !showAllPurchases}>
        {showAllPurchases ? "Collapse" : "See All"}
      </button>
    {/if}
  {:else}
    <p>No purchases yet.</p>
  {/if}

  <h3>Recurring Payments</h3>
  {#if recurring.length > 0}
    <ul>
      {#each visibleRecurring as r (r.id)}
        <li>
          <div class="name">{r.purchaseName}</div>
          <div class="category">{r.category}</div>
          <div class="date">{new Date(r.date).toLocaleDateString()}</div>
          <div class="type">recurring</div>
          <div class="price">${r.price}</div>
          <div class="actions">
            <button class="edit-btn" on:click={() => { editingEntry = r; editingType = "recurring" }}>✏️</button>
            <button class="delete-btn" on:click={() => deleteRecurring(r.id)}>🗑️</button>
          </div>
        </li>
      {/each}
    </ul>
    {#if recurring.length > 10}
      <button class="toggle-btn" on:click={() => showAllRecurring = !showAllRecurring}>
        {showAllRecurring ? "Collapse" : "See All"}
      </button>
    {/if}
  {:else}
    <p>No recurring entries yet.</p>
  {/if}

  <h3>Paychecks</h3>
  {#if paychecks.length > 0}
    <ul>
      {#each visiblePaychecks as p (p.id)}
        <li>
          <div class="name">{p.purchaseName}</div>
          <div class="date">{new Date(p.date).toLocaleDateString()}</div>
          <div class="type">paycheck</div>
          <div class="price">${p.price}</div>
          <div class="actions">
            <button class="edit-btn" on:click={() => { editingEntry = p; editingType = "paycheck" }}>✏️</button>
            <button class="delete-btn" on:click={() => deletePaycheck(p.id)}>🗑️</button>
          </div>
        </li>
      {/each}
    </ul>
    {#if paychecks.length > 10}
      <button class="toggle-btn" on:click={() => showAllPaychecks = !showAllPaychecks}>
        {showAllPaychecks ? "Collapse" : "See All"}
      </button>
    {/if}
  {:else}
    <p>No paychecks yet.</p>
  {/if}
</div>

<EditModal
  entry={editingEntry}
  type={editingType}
  on:close={() => editingEntry = null}
  on:save={(e) => {
    const updated = e.detail
    if (editingType === "purchase") updatePurchase(updated)
    if (editingType === "recurring") updateRecurring(updated)
    if (editingType === "paycheck") updatePaycheck(updated)
    editingEntry = null
  }}
/>

<style>
  .edit-entries ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
  }

  .edit-entries li {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
    gap: .5rem;
    padding: .5rem 0;
    border-bottom: 1px solid #eee;
    align-items: center;
    font-size: .95rem;
  }

  .actions {
    display: flex;
    gap: .5rem;
    justify-content: flex-end;
  }

  .edit-btn,
  .delete-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1.1rem;
  }

  .delete-btn {
    color: red;
  }

  .toggle-btn {
    margin-top: .5rem;
    padding: .4rem .8rem;
    border: none;
    border-radius: 6px;
    background: #0077cc;
    color: white;
    font-size: .85rem;
    cursor: pointer;
  }

  .toggle-btn:hover {
    background: #005fa3;
  }
</style>
