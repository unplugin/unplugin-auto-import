import type { ImportsMap } from '../types'

export default <ImportsMap>{
  // https://recoiljs.org/docs/api-reference/core/atom/
  recoil: [
    'atom',
    'selector',
    'useRecoilState',
    'useRecoilValue',
    'useSetRecoilState',
    'useResetRecoilState',
    'useRecoilStateLoadable',
    'useRecoilValueLoadable',
    'isRecoilValue',
    'useRecoilCallback',
  ],
}
