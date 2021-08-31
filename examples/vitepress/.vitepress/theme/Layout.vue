<script setup lang="ts">
import Home from './components/Home.vue'
import PageFooter from "./components/PageFooter.vue";
// generic state
const route = useRoute()
const { site, page, theme } = useData()

// home
const enableHome = computed(() => !!route.data.frontmatter.home)
</script>

<template>
  <div class="theme">

    <Home v-if="enableHome">
      <template #features>
        <slot name="home-features" />
      </template>
    </Home>

    <template v-else>
      <Content />
      <PageFooter />
    </template>

  </div>

</template>
