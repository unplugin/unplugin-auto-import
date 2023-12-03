<script lang="ts">
  import Counter from './lib/Counter.svelte'

  let visible = true

  onMount(function() {
      console.log('onMount called')
  })

  $:browser = detect()
</script>

<main>
  <h1>Hello Typescript!</h1>

  <label>
    <input type="checkbox" bind:checked={visible} />
    visible
  </label>

  {#if visible}
    <p transition:fade>
      Fades in and out
    </p>
  {/if}

  <br />

  <Counter />

  <pre>Browser: { browser?.name }</pre>
</main>

