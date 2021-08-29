const list = writable([1, 2, 3])
const size = tweened(1, {
  duration: 300,
  easing: cubicOut
});
onMount(() => {})

{#each $list as n (n)}
<div animate:flip="{{delay: 250, duration: 250, easing: quintOut}}">
  {n}
</div>
{/each}

{#if condition}
  <div transition:fade="{{amount: 10}}">
    fades in and out
  </div>
{/if}
