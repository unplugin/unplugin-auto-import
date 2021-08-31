<script setup lang="ts">
const { site } = useData()
const links = computed(() => site.value.themeConfig.nav)
const show = computed(() => links.value)
onMounted(() => {
  console.log(links.value)
})
</script>

<template>
  <footer v-if="show" class="footer">
    <template v-if="links">
      <template v-for="items in links" :key="items.text">
        <div v-for="item in items.items" :key="item.text" class="item">
          <a :href="item.link">{{ item.text }}</a>
        </div>
      </template>
    </template>
  </footer>
</template>

<style scoped>
.footer {
  margin: 0 auto;
  max-width: 960px;
}

@media (min-width: 720px) {
  .footer {
    padding: 0 1.5rem;
  }
}

</style>
