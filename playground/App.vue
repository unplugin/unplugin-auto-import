<script lang="ts" setup>
import HelloWorld from './HelloWorld.vue'

ElMessage.warning('Test')
const composableFoo = useFoo()
const composableBar = useBar()

const utilsFoo = foo.useFoo()
const utilsBar = bar.useBar()
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
  <pre>{{ composableFoo }}</pre>
  <pre>{{ composableBar }}</pre>
  <pre>{{ utilsFoo }}</pre>
  <pre>{{ utilsBar }}</pre>
  <pre>{{ FOOBAR }}</pre>
  <div v-loading="false">
    <ElButton>Hello</ElButton>
  </div>
</template>
