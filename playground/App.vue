<script lang="ts" setup>
import HelloWorld from './HelloWorld.vue'
ElMessage.warning('Test')
const foo = useFoo()
const bar = useBar()
const changeCase = useChangeCase('hello world', 'dotCase')
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
  <pre>{{ bar }}</pre>
  <pre>{{ FOOBAR }}</pre>
  <pre>{{ changeCase }}</pre>
  <div v-loading="false">
    <ElButton>Hello</ElButton>
  </div>
</template>
