<template>
  <div>
    <hello-world :msg="msg" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './HelloWorld.vue'

const msg = ref('Global Imports')
const title = useTitle()
console.log(title.value) // print current title
title.value = 'Hello' // change current title
</script>
