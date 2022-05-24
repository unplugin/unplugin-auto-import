<script lang="ts" setup>
import HelloWorld from './HelloWorld.vue'
ElMessage.warning('Test')
const foo = useFoo()
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
  <pre>{{ foo }}</pre>
  <pre>{{ FOOBAR }}</pre>
  <div v-loading="false">
    <ElButton>Hello</ElButton>
  </div>
</template>
