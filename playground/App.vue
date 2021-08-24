<template>
  <div>
    <hello-world :msg="msg" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './HelloWorld.vue'

const msg = ref('Global Imports')
</script>
