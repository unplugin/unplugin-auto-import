<script setup lang='ts'>
const count = ref(0)

function add() {
  count.value++
}
</script>

<template>
  <div>
    <h1>Vue {{ count }}</h1>
    <button @click="add">
      Add
    </button>
  </div>
</template>
