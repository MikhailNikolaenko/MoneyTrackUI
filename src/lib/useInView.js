export function inView(node, options) {
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0]
    node.dispatchEvent(new CustomEvent("visibilitychange", {
      detail: entry.isIntersecting
    }))
  }, options)

  observer.observe(node)

  return {
    destroy() {
      observer.disconnect()
    }
  }
}
