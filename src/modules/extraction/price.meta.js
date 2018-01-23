// @flow

import { valueCreator, cleanupString, getMetaValue } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('price', 'price.meta')

function getValue(dom): ?Value {
  const value = getMetaValue(dom, 'product:price:currency')
  if (!value) return null
  return createValue(value, 100)
}

export default (dom: Stage2PluginData): Value => getValue(dom) || createValue('', 0)
