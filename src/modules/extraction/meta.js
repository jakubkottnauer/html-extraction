// @flow

import { valueCreator, cleanupString, getMetaValue } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const fields = [
  'description',
  { field: 'og:description', sameAs: 'description' },
  { field: 'product:price:currency', sameAs: 'price' },
]
const key = 'meta'

function getValue(dom, field: string | { field: string, sameAs: string }): Value {
  const resultName = typeof field === 'string' ? field : field.sameAs
  const fieldName = typeof field === 'string' ? field : field.field
  const createValue = valueCreator(resultName, key)
  const value = getMetaValue(dom, fieldName)
  return value ? createValue(value, 100) : createValue(null, 0)
}

export default (dom: Stage2PluginData): Array<Value> => {
  const results = fields.reduce((acc, f) => [...acc, getValue(dom, f)], [])

  const entityTypeVal = (getMetaValue(dom, 'og:type') || '').toLowerCase()
  const entityType = valueCreator('entityType', key)(
    entityTypeVal,
    entityTypeVal.length > 0 ? 100 : 0
  )

  return [...results, entityType]
}
