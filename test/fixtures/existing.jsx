import ref from 'ref'
import { computed } from 'computed'

const a = ref(0)
const b = computed(0)

watch(a)
ignored(b)
