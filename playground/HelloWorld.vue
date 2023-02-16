<script setup lang="ts">
defineProps<{ msg: string }>()

const emit = defineEmits(['update'])

function inc() {
  count.value += 1
}

function dec() {
  count.value -= 1
}

const decText = '<b>Dec</b>'

watch(count, value => emit('update', value))
</script>

<template>
  <div style="margin-bottom: 10px;">
    <h3>{{ msg }}</h3>
    <button @click="inc">
      Inc
    </button>
    <div>{{ doubled / 2 }} x 2 = {{ doubled }}</div>
    <button @click="dec()" v-html="decText" />
  </div>
</template>
