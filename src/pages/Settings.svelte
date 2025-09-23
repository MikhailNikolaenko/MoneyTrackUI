<script>
  import { userData } from "../stores/user.js";

  const themes = {
    default: { name: "Default", primary: "#0077cc", secondary: "#ffffff", accent: "#ff6600", text: "#000000", darkSecondary: "#1e1e1e", darkText: "#eeeeee" },
    forest: { name: "Forest", primary: "#2e7d32", secondary: "#a5d6a7", accent: "#66bb6a" },
    sunset: { name: "Sunset", primary: "#ff7043", secondary: "#ffe0b2", accent: "#f57c00" },
    ocean:  { name: "Ocean", primary: "#0288d1", secondary: "#b3e5fc", accent: "#03a9f4" }
  };

  let selectedTheme = $userData.theme || "default";
  let darkMode = $userData.darkMode || false;
  let saved = false;

  function applyTheme(themeKey, isDark) {
    const themeVars = themes[themeKey];
    for (const [key, value] of Object.entries(themeVars)) {
      if (key !== "name") {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    }
    document.documentElement.classList.toggle("dark", isDark);
  }

  function saveSettings() {
    userData.update(u => {
      u.theme = selectedTheme;
      u.darkMode = darkMode;
      return u;
    });

    applyTheme(selectedTheme, darkMode);

    saved = true;
    setTimeout(() => (saved = false), 2000);
  }
</script>

<div class="settings">
  <h2>Settings</h2>

  <label>
    Theme:
    <select bind:value={selectedTheme}>
      {#each Object.keys(themes) as key}
        <option value={key}>{themes[key].name}</option>
      {/each}
    </select>
  </label>

  <div
    class="toggle-container"
    on:click={() => {
      darkMode = !darkMode;
    }}
  >
    <div class="toggle-track {darkMode ? 'dark' : ''}">
      <div class="toggle-thumb" class:dark={darkMode}></div>
    </div>
    <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
  </div>

  <button on:click={saveSettings}>
    {#if saved}
      ✅ Saved!
    {:else}
      Make Change
    {/if}
  </button>
</div>

<style>
  .settings {
    max-width: 400px;
    margin: 0 auto;
    background: var(--secondary, #fff);
    color: var(--text, #000);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transition: background 0.3s ease, color 0.3s ease;
  }

  h2 {
    margin: 0;
    color: var(--primary, var(--text));
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
    color: var(--text, #000);
  }

  select {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: 1px solid var(--border, #ccc);
    border-radius: 6px;
    background: var(--input-bg, #fff);
    color: var(--text, #000);
    transition: background 0.3s ease, color 0.3s ease;
  }

  /* Toggle */
  .toggle-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
  }

  .toggle-track {
    width: 50px;
    height: 26px;
    background: var(--border, #ccc);
    border-radius: 15px;
    position: relative;
    transition: background 0.3s ease;
  }

  .toggle-track.dark {
    background: var(--accent, #666);
  }

  .toggle-thumb {
    width: 20px;
    height: 20px;
    background: var(--secondary, #fff);
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 3px;
    transition: transform 0.3s ease, background 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .toggle-thumb.dark {
    transform: translateX(24px);
    background: var(--text, #333);
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
    background: var(--accent, #005fa3);
  }

  /* Dark mode global */
  :global(.dark .settings) {
    background: var(--darkSecondary, #1e1e1e);
    color: var(--darkText, #eee);
  }

  :global(.dark h2),
  :global(.dark label) {
    color: var(--darkText, #eee);
  }

  :global(.dark select) {
    background: #2a2a2a;
    border: 1px solid #555;
    color: var(--darkText, #eee);
  }
</style>
