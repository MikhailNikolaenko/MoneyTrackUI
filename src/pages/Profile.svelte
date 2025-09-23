<script>
  import { userData } from "../stores/user.js";

  let name = $userData.name || "";
  let balance = $userData.balance || 0;

  let saved = false;

  function saveProfile() {
    userData.update(u => {
      u.name = name;
      u.balance = balance;
      return u;
    });

    saved = true;
    setTimeout(() => (saved = false), 2000);
  }
</script>

<div class="profile">
  <h2>Profile Settings</h2>

  <form on:submit|preventDefault={saveProfile}>
    <label>
      Name:
      <input type="text" bind:value={name} />
    </label>

    <label>
      Starting Balance:
      <input type="number" bind:value={balance} step="0.01" />
    </label>

    <button type="submit">
      {#if saved}
        ✅ Saved!
      {:else}
        Save
      {/if}
    </button>
  </form>
</div>

<style>
  .profile {
    max-width: 400px;
    margin: 0 auto;
    background: var(--secondary, #fff);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    color: var(--text, #000);
    transition: background 0.3s ease, color 0.3s ease;
  }

  h2 {
    margin-top: 0;
    color: var(--primary, var(--text));
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
    color: var(--text, #000);
  }

  input {
    padding: 0.5rem;
    border: 1px solid var(--border, #ccc);
    border-radius: 6px;
    background: var(--input-bg, #fff);
    color: var(--text, #000);
    transition: background 0.3s ease, color 0.3s ease, border 0.3s ease;
  }

  button {
    padding: 0.6rem;
    border: none;
    border-radius: 6px;
    background: var(--primary, #0077cc);
    color: var(--button-text, #fff);
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: var(--primary-hover, #005fa3);
  }

  /* Dark mode overrides */
  :global(.dark .profile) {
    background: var(--dark-secondary, #1e1e1e);
    color: var(--dark-text, #eee);
  }

  :global(.dark h2),
  :global(.dark label) {
    color: var(--dark-text, #eee);
  }

  :global(.dark input) {
    background: var(--dark-secondary, #2a2a2a);
    border-color: var(--dark-border, #444);
    color: var(--dark-text, #eee);
  }

  :global(.dark button) {
    background: var(--primary, #0077cc);
    color: var(--button-text, #fff);
  }

  :global(.dark button:hover) {
    background: var(--primary-hover, #3399ff);
  }
</style>
