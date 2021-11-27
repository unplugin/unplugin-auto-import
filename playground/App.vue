<template>
  <div v-loading="true">
    123
    <ElButton>Hello</ElButton>
  </div>
</template>

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

<script lang="ts" setup>
ElMessage.warning('Test')
</script>
