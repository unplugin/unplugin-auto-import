<script lang="ts">
  const count = writable(0)
  function increment() {
      count.update(n => n + 1)
  }
</script>

<button on:click={increment}>
  Clicks: {$count}
</button>

