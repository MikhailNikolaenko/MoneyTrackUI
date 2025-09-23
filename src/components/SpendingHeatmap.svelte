<script>
  import * as d3 from "d3"
  import { onMount } from "svelte"
  import { userData } from "../stores/user.js"

  let svgEl
  let legendEl
  let cellSize = 15

  $: allTransactions = [
    ...($userData?.purchases || []),
    ...($userData?.recurring || [])
  ]

  $: sortedTransactions = [...allTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  let showAll = false

  $: visibleTransactions = showAll
    ? sortedTransactions
    : sortedTransactions.slice(0, 10)

  $: purchases = $userData?.purchases || []

  $: dailyTotals = d3.rollup(
    purchases,
    v => d3.sum(v, d => +d.price),
    d => d.date.slice(0, 10)
  )

  const today = new Date()
  const days = d3.timeDay.range(
    d3.timeDay.offset(today, -364),
    d3.timeDay.offset(today, 1)
  )

  $: maxValue = d3.max(dailyTotals.values()) || 0

  $: color = d3
    .scaleSequential(d3.interpolateReds)
    .domain([0, Math.max(1, maxValue)])

  onMount(() => {
    draw()
    drawLegend()
  })
  $: if (purchases) {
    draw()
    drawLegend()
  }

  function draw() {
    if (!svgEl) return
    const svg = d3.select(svgEl)
    svg.selectAll("*").remove()

    const weeks =
      d3.timeWeek.count(
        d3.timeWeek.floor(d3.timeDay.offset(today, -364)),
        today
      ) + 1

    svg
      .attr("width", weeks * (cellSize + 2))
      .attr("height", 7 * (cellSize + 2))

    svg
      .selectAll("rect")
      .data(days)
      .join("rect")
      .attr("x", d =>
        d3.timeWeek.count(
          d3.timeWeek.floor(d3.timeDay.offset(today, -364)),
          d
        ) * (cellSize + 2)
      )
      .attr("y", d => d.getDay() * (cellSize + 2))
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", d => {
        const key = d.toISOString().slice(0, 10)
        const value = dailyTotals.get(key) || 0
        return value === 0 ? "var(--border, #eee)" : color(value)
      })
      .append("title")
      .text(d => {
        const key = d.toISOString().slice(0, 10)
        const value = dailyTotals.get(key) || 0
        return `${d.toDateString()}: $${value}`
      })
  }

  function drawLegend() {
    if (!legendEl) return
    const legend = d3.select(legendEl)
    legend.selectAll("*").remove()

    const gradientId = "heatmap-gradient"

    const defs = legend.append("defs")
    const gradient = defs
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")

    const stops = d3.range(0, 1.01, 0.1).map(t => ({
      offset: `${t * 100}%`,
      color: color(t * Math.max(1, maxValue))
    }))

    gradient
      .selectAll("stop")
      .data(stops)
      .join("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color)

    legend
      .append("rect")
      .attr("width", 200)
      .attr("height", 15)
      .style("fill", `url(#${gradientId})`)

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 27)
      .attr("font-size", "10px")
      .attr("fill", "var(--text, #333)")
      .text(`$0`)

    legend
      .append("text")
      .attr("x", 200)
      .attr("y", 27)
      .attr("text-anchor", "end")
      .attr("font-size", "10px")
      .attr("fill", "var(--text, #333)")
      .text(`$${maxValue}`)
  }
</script>

<div class="heatmap-container">
  <h2>Spending Heatmap</h2>
  <div class="heatmap-wrapper">
    <svg bind:this={svgEl}></svg>
  </div>
  <svg bind:this={legendEl} width="220" height="30"></svg>

  <div class="purchase-history">
    <h3>Transactions</h3>
    {#if visibleTransactions.length > 0}
      <ul>
        {#each visibleTransactions as p (p.id)}
          <li>
            <div class="name"><strong>{p.purchaseName}</strong></div>
            <div class="category">{p.category}</div>
            <div class="date">{new Date(p.date).toLocaleDateString()}</div>
            <div class="type">{p.type}</div>
            <div class="price">
              {(+p.price).toLocaleString(undefined, {
                style: "currency",
                currency: "USD"
              })}
            </div>
          </li>
        {/each}
      </ul>

      {#if sortedTransactions.length > 10}
        <button class="toggle-btn" on:click={() => showAll = !showAll}>
          {showAll ? "Collapse" : "See All"}
        </button>
      {/if}
    {:else}
      <p>No transactions yet.</p>
    {/if}
  </div>
</div>

<style>
  .heatmap-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--text, #000);
  }

  h2, h3 {
    color: var(--text, #333);
  }

  .heatmap-wrapper svg {
    background: var(--secondary, #fafafa);
    padding: .5rem;
    border-radius: 8px;
  }

  .purchase-history {
    width: 100%;
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;
    border: 1px solid var(--border, #ccc);
    border-radius: 8px;
    background: var(--secondary, #fff);
  }

  .purchase-history ul {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 220px;
    overflow-y: auto;
  }

  .purchase-history li {
    display: grid;
    grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
    gap: .5rem;
    padding: .5rem 0;
    border-bottom: 1px solid var(--border, #f0f0f0);
    font-size: .95rem;
    align-items: center;
  }

  .purchase-history li:last-child {
    border-bottom: none;
  }

  .purchase-history li > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toggle-btn {
    margin-top: .75rem;
    padding: .4rem .8rem;
    border: none;
    border-radius: 6px;
    background: #0077cc;
    color: #fff;
    font-size: .85rem;
    cursor: pointer;
  }

  .toggle-btn:hover {
    background: #005fa3;
  }

  :global(.dark .purchase-history) {
    background: var(--dark-secondary, #1e1e1e);
    border-color: var(--dark-border, #333);
  }

  :global(.dark .heatmap-container),
  :global(.dark h2),
  :global(.dark h3) {
    color: var(--dark-text, #eee);
  }
</style>
