<script lang="ts">
  import { useCounter } from "../store";

  const count = useCounter(0)
  function increment() {
      count.update(n => n + 1)
  }
</script>

<button on:click={increment}>
  Clicks: {$count}
</button>

