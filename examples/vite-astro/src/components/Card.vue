<script setup lang='ts'>
const count = ref(0)
let number = $ref(0)

function add() {
  count.value++
  number++
}
</script>

<template>
  <div>
    <h1>Vue {{ count }}</h1>
    <h1>Vue/maros {{ number }}</h1>
    <button @click="add">
      Add
    </button>
  </div>
</template>
