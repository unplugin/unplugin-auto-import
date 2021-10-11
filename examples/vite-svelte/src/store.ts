export function useCounter<T>(initial: T): Writable<T> {
  return writable(initial)
}
