<script>
  import Card from '../components/Card.svelte'
  import { inView } from '../lib/useInView.js'
  import { userData } from '../stores/user.js'
  import { markActive, addPurchase, addRecurring, addPaycheck, addGoal, succeedGoal } from '../lib/userUtils.js'
  import { onDestroy } from 'svelte'
  import Icon from '../components/Icon.svelte'

  markActive()

  let visibleCards = Array(7).fill(false)

  $: daysSinceStart = Math.floor(
    (Date.now() - new Date($userData.startDate).getTime()) / (1000 * 60 * 60 * 24)
  )
  $: daysActive = $userData.activeDays.length

  const startOfWeek = (() => {
    const d = new Date()
    d.setDate(d.getDate() - d.getDay())
    d.setHours(0, 0, 0, 0)
    return d
  })()

  $: savedThisWeek = ($userData?.succeededGoals || [])
    .filter(g => new Date(g.succeededAt) >= startOfWeek)
    .reduce((sum, g) => sum + Number(g.amount || 0), 0)

  let now = new Date()
  const interval = setInterval(() => {
    now = new Date()
  }, 1000)
  onDestroy(() => clearInterval(interval))

  let purchaseName = ''
  let date = ''
  let price = ''
  let category = 'food'
  let saved = false

  let recurringName = ''
  let recurringPrice = ''
  let recurringCategory = 'subscription'
  let recurringDate = ''
  let recurringSaved = false

  let paycheckName = ''
  let paycheckAmount = ''
  let paycheckDay = ''
  let paycheckSaved = false

  let goalType = "spending"
  let goalAmount = ""
  let goalTimeframe = "week"
  let goalCategory = "all"
  let goalSaved = false
</script>

<div class="grid">
  <div
    use:inView={{ threshold: 0.2 }}
    on:visibilitychange={e => {
      visibleCards = [...visibleCards]
      visibleCards[0] = e.detail
    }}
    class="card-wrapper"
    class:visible={visibleCards[0]}
  >
    <Card>
      <div class="hero-content">
        <div class="hero-left">
          <h2>Welcome, {$userData.name} <Icon name="hand" /></h2>
          <p>{now.toLocaleDateString()} — {now.toLocaleTimeString()}</p>
          <p>Days since start: {daysSinceStart}</p>
          <p>Days active: {daysActive}</p>
        </div>
        <div class="divider"></div>
        <div class="hero-right">
          <h2>Finances</h2>
          <p>
            <Icon name="wallet" />
            Saved this week: 
            {savedThisWeek.toLocaleString(undefined, { style: "currency", currency: "USD" })}
          </p>
          <p>
            <Icon name="bank" />
            Balance: {(+ $userData.balance).toLocaleString(undefined, { style: "currency", currency: "USD" })}
          </p>
        </div>
      </div>
    </Card>
  </div>

  <div
    use:inView={{ threshold: 0.2 }}
    on:visibilitychange={e => {
      visibleCards = [...visibleCards]
      visibleCards[7] = e.detail
    }}
    class="card-wrapper"
    class:visible={visibleCards[7]}
  >
    <Card>
      <div class="goals-hero">
        <h2><Icon name="target" /> Your Goals</h2>
        {#if $userData.goals && $userData.goals.length > 0}
          <ul>
            {#each $userData.goals as g (g.id)}
              <li>
                <div class="goal-info">
                  {#if g.type === "spending"}
                    Limit spending to ${g.amount} this {g.timeframe}
                  {:else if g.type === "saving"}
                    Save at least ${g.amount} this {g.timeframe}
                  {:else if g.type === "category"}
                    Spend less than ${g.amount} on {g.category} this {g.timeframe}
                  {/if}
                </div>
                <div class="goal-actions">
                  <button on:click={() => succeedGoal(g.id)}>
                    <Icon name="check" /> Success
                  </button>
                </div>
              </li>
            {/each}
          </ul>
        {:else}
          <p>No active goals yet <Icon name="arrow-down" /></p>
        {/if}
      </div>
    </Card>
  </div>

  <div class="two-col">
    {#each [1, 2, 3, 4] as i, idx}
      <div
        use:inView={{ threshold: 0.2 }}
        on:visibilitychange={e => {
          visibleCards = [...visibleCards]
          visibleCards[i] = e.detail
        }}
        class="card-wrapper"
        class:visible={visibleCards[i]}
        style="transition-delay: {visibleCards[i] ? idx * 150 + 'ms' : '0ms'}"
      >
        {#if i === 1}
          <Card title="Add Purchase">
            <form
              on:submit|preventDefault={() => {
                addPurchase(purchaseName, date, price, category)
                purchaseName = ''
                date = ''
                price = ''
                category = 'food'
                saved = true
                setTimeout(() => saved = false, 2000)
              }}
            >
              <label>
                Purchase Name:
                <input type="text" bind:value={purchaseName} required />
              </label>
              <label>
                Date:
                <input type="date" bind:value={date} required />
              </label>
              <label>
                Price:
                <input type="number" bind:value={price} required />
              </label>
              <label>
                Category:
                <select bind:value={category}>
                  <option value="food">Food</option>
                  <option value="clothing">Clothing</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="gifts">Gifts</option>
                  <option value="electronics">Electronics</option>
                  <option value="travel">Travel</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <button type="submit">
                {#if saved}
                  <Icon name="check" /> Saved!
                {:else} Save {/if}
              </button>
            </form>
          </Card>
        {:else if i === 2}
          <Card title="Add Recurring Payment">
            <form
              on:submit|preventDefault={() => {
                addRecurring(recurringName, recurringPrice, recurringCategory, recurringDate)
                recurringName = ''
                recurringPrice = ''
                recurringCategory = 'subscription'
                recurringDate = ''
                recurringSaved = true
                setTimeout(() => recurringSaved = false, 2000)
              }}
            >
              <label>
                Payment Name:
                <input type="text" bind:value={recurringName} required />
              </label>
              <label>
                Amount:
                <input type="number" bind:value={recurringPrice} required />
              </label>
              <label>
                Category:
                <select bind:value={recurringCategory}>
                  <option value="subscription">Subscription</option>
                  <option value="car-loan">Car Loan</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="insurance">Insurance</option>
                  <option value="utilities">Utilities</option>
                  <option value="phone">Phone Plan</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Billing Date:
                <input type="date" bind:value={recurringDate} required />
              </label>
              <button type="submit">
                {#if recurringSaved}
                  <Icon name="check" /> Saved!
                {:else} Save {/if}
              </button>
            </form>
          </Card>
        {:else if i === 3}
          <Card title="Add Paycheck">
            <form
              on:submit|preventDefault={() => {
                addPaycheck(paycheckName, paycheckAmount, paycheckDay)
                paycheckName = ''
                paycheckAmount = ''
                paycheckDay = ''
                paycheckSaved = true
                setTimeout(() => paycheckSaved = false, 2000)
              }}
            >
              <label>
                Paycheck Name:
                <input type="text" bind:value={paycheckName} required />
              </label>
              <label>
                Amount:
                <input type="number" bind:value={paycheckAmount} required />
              </label>
              <label>
                Day:
                <input type="date" bind:value={paycheckDay} required />
              </label>
              <button type="submit">
                {#if paycheckSaved}
                  <Icon name="check" /> Saved!
                {:else} Save {/if}
              </button>
            </form>
          </Card>
        {:else if i === 4}
          <Card title="Set a Goal">
            <form
              on:submit|preventDefault={() => {
                addGoal(goalType, goalAmount, goalTimeframe, goalCategory)
                goalType = "spending"
                goalAmount = ""
                goalTimeframe = "week"
                goalCategory = "all"
                goalSaved = true
                setTimeout(() => goalSaved = false, 2000)
              }}
            >
              <label>
                Goal Type:
                <select bind:value={goalType}>
                  <option value="spending">Limit Spending</option>
                  <option value="saving">Save At Least</option>
                  <option value="category">Limit Category</option>
                </select>
              </label>
              <label>
                Amount ($):
                <input type="number" bind:value={goalAmount} required />
              </label>
              <label>
                Timeframe:
                <select bind:value={goalTimeframe}>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </label>
              {#if goalType === "category"}
                <label>
                  Category:
                  <select bind:value={goalCategory}>
                    <option value="all">All</option>
                    <option value="food">Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="transportation">Transportation</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              {/if}
              <button type="submit">
                {#if goalSaved}
                  <Icon name="check" /> Saved!
                {:else} Save Goal {/if}
              </button>
            </form>
          </Card>
        {:else}
          <Card title={`Card ${i}`} content={`This is card ${i}.`} />
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .card-wrapper {
    opacity: 0;
    transform: translateY(40px);
    transition: all .5s ease;
  }
  .card-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-content {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }

  .divider {
    width: 1px;
    background: #ddd;
  }

  .goals-hero {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .goals-hero ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .goals-hero li {
    display: flex;
    justify-content: space-between;
    padding: .5rem 0;
    border-bottom: 1px solid #ddd;
  }

  .goal-info {
    font-size: .95rem;
  }

  .goal-actions button {
    padding: .3rem .6rem;
    border: none;
    border-radius: 6px;
    background: #2e7d32;
    color: #fff;
    font-size: .85rem;
    cursor: pointer;
  }

  .goal-actions button:hover {
    background: #1b5e20;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: .9rem;
  }

  input, select {
    padding: .5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  button {
    margin-top: .5rem;
    padding: .5rem 1rem;
    border: none;
    background: #ff0000a1;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
  }
  button:hover {
    background: #640000;
  }
  button:disabled {
    background: #6c757d;
    cursor: default;
  }
</style>
