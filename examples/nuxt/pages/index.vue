<template>
  <div>
    <hello-world name="Vue 2" @update="onUpdate" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'

function onUpdate(e: any) {
  console.log(e)
}
</script>
