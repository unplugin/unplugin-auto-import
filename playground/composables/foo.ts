export function useFoo() {
  return 'foo from ./composables/'
}

export const FOOBAR = 'auto import in Vue template'

export const count: Ref<number> = ref(0)
export const doubled = computed(() => count.value * 2)
