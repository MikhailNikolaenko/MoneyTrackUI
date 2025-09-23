<script>
  import Icon from "./components/Icon.svelte";
  import HomeView from "./pages/Home.svelte";
  import SettingsView from "./pages/Settings.svelte";
  import ProfileView from "./pages/Profile.svelte";
  import DataCenter from "./pages/DataCenter.svelte";
  import { simulateUserData } from "./lib/userUtils.js";

  let currentTab = "home";
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: var(--background, #f9f9f9);
    color: var(--text, #000);
  }

  body {
    overflow-x: hidden;
  }

  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background: var(--background, #f9f9f9);
    color: var(--text, #000);
  }

  .tab-menu {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    border-bottom: 1px solid var(--border, #ccc);
    background: var(--secondary, #fff);
  }

  .icons {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex: 1;
  }

  .icons button {
    border: none;
    font-size: 1.6rem;
    cursor: pointer;
    padding: 0.5rem;
    background: none;
    color: var(--text, #000);
  }

  .icons button:hover {
    color: var(--primary, #0077cc);
  }

  .simulate-btn {
    font-size: 0.8rem;
    padding: 0.35rem 0.6rem;
    background: var(--primary, #0077cc);
    color: #fff;
    border-radius: 6px;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }

  .simulate-btn:hover {
    background: var(--accent, #005fa3);
  }

  .main-view {
    flex-grow: 1;
    overflow-y: auto;
    padding: 2rem;
    box-sizing: border-box;
  }

  :global(.dark),
  :global(.dark body),
  :global(.dark .app) {
    background: var(--dark-background, #121212);
    color: var(--dark-text, #eee);
  }

  :global(.dark .tab-menu) {
    background: var(--dark-secondary, #1e1e1e);
    border-bottom: 1px solid var(--dark-border, #333);
  }

  :global(.dark .icons button) {
    color: var(--dark-text, #eee);
  }

  :global(.dark .simulate-btn) {
    background: var(--primary, #0077cc);
    color: #fff;
  }
</style>

<div class="app">
  <div class="tab-menu">
    <div class="icons">
      <button on:click={() => currentTab = "home"}>
        <Icon name="home" size={28} />
      </button>
      <button on:click={() => currentTab = "profile"}>
        <Icon name="profile" size={28} />
      </button>
      <button on:click={() => currentTab = "settings"}>
        <Icon name="settings" size={28} />
      </button>
      <button on:click={() => currentTab = "datacenter"}>
        <Icon name="datacenter" size={28} />
      </button>
    </div>

    <button class="simulate-btn" on:click={simulateUserData}>
      Simulate
    </button>
  </div>

  <div class="main-view">
    {#if currentTab === "home"}
      <HomeView />
    {:else if currentTab === "profile"}
      <ProfileView />
    {:else if currentTab === "settings"}
      <SettingsView />
    {:else if currentTab === "datacenter"}
      <DataCenter />
    {/if}
  </div>
</div>
