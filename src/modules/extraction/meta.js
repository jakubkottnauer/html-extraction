// @flow

import { valueCreator, cleanupString, getMetaValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const fields = [
  'description',
  { field: 'og:description', sameAs: 'description' },
  { field: 'product:price:currency', sameAs: 'price' },
]

function getValue(dom, field: string | { field: string, sameAs: string }): Value {
  const resultName = typeof field === 'string' ? field : field.sameAs
  const fieldName = typeof field === 'string' ? field : field.field
  const createValue = valueCreator(resultName, 'meta')
  const value = getMetaValue(dom, fieldName)
  return value ? createValue(value, 100) : createValue(null, 0)
}

export default (dom: Stage2PluginData): Array<Value> =>
  fields.reduce((acc, f) => [...acc, getValue(dom, f)], [])
