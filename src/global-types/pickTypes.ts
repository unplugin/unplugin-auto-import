import { Arrayable } from '@antfu/utils'
import { ImportNameTypeAlias, ImportsTypeMap } from '../types'
import { TypePresetName, globalTypes } from '.'

const useGlobalTypes = Object.values(globalTypes).reduce((acc, preset) => {
  // should have only one entry
  Object.keys(preset).forEach((e) => {
    acc[e] = preset[e]
  })
  return acc
}, {} as Record<string, (string | ImportNameTypeAlias)[]>)

type PickPresetTypes = Record<string, string[]> | TypePresetName

export const pickTypes = (types: Array<PickPresetTypes>): Arrayable<ImportsTypeMap | TypePresetName> => {
  const result: Array<ImportsTypeMap | TypePresetName> = []
  const includePresets = types.reduce((acc, preset) => {
    if (typeof preset === 'string') {
      acc.set(preset, [])
    }
    else {
      Object.keys(preset).forEach((p) => {
        acc.set(p, preset[p as TypePresetName])
      })
    }

    return acc
  }, new Map<string, Array<string>>())
  Object.keys(useGlobalTypes).filter(preset => includePresets.has(preset)).forEach((preset) => {
    const types = includePresets.get(preset)!
    if (types.length > 0) {
      const presetEntry = useGlobalTypes[preset]
      const data = presetEntry.filter((pt) => {
        if (typeof pt === 'string')
          return types.includes(pt)
        else
          return types.includes(pt[0])
      })
      const imports: ImportsTypeMap = { }
      imports[preset] = data
      result.push(imports)
    }
    else {
      result.push(preset as TypePresetName)
    }
  })
  return result
}
