<script>
  let count = writable(0)

  onMount(() => {
    console.log('Test unplugin-auto-import ')
  })

  function add() {
    count.set(($count += 1))
  }
</script>

<h1 text="#ff3e00">Svelte-{$count}</h1>
<button on:click={add}>add</button>
