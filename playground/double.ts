export const double = (value: Ref<number> | number): Ref<number> => {
  return computed(() => {
    return unref(value) * 2
  })
}
