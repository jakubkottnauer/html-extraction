// @flow

import { valueCreator, getMicrodataValue, schemaFields } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const key = 'microdata.schemaorg'

export default (dom: Stage2PluginData): Array<Value> => {
  const fields = schemaFields()
  return fields
    .map(field => ({ field, value: getMicrodataValue(dom, field) }))
    .filter(r => r.value)
    .map(r => valueCreator(r.field, key)(r.value, 100))
}
