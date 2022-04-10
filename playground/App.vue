<script lang="ts" setup>
import HelloWorld from './HelloWorld.vue'
ElMessage.warning('Test')
</script>

<script lang="ts">
export default defineComponent({
  components: {
    ElButton,
  },
  directives: {
    loading: vLoading,
  },
})
</script>

<template>
  <HelloWorld msg="hi" />
  <div v-loading="false">
    123
    <ElButton>Hello</ElButton>
  </div>
</template>
