// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('price', 'price.micro')

function getValue(dom): ?Value {
  const value = getMicrodataValue(dom, 'price')
  if (!value) return null
  return createValue(parseFloat(value), 100)
}

export default (dom: Stage2PluginData): Value => getValue(dom) || createValue(0, 0)
