// @flow

import { valueCreator, getMicrodataValue, schemaFields } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const key = 'class.schemaorg'

export default async (dom: Stage2PluginData): Promise<Array<Value>> => {
  const fields = await schemaFields()
  return fields
    .map(field => ({ field, value: dom.find(`.${field}`)?.[0]?.innerText ?? null }))
    .filter(r => r.value)
    .map(r => valueCreator(r.field, key)(r.value, 10))
}
