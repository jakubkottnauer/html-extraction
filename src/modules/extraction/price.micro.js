// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('price', 'meta')

function getValue(dom): ?Value {
  const price = getMicrodataValue(dom, 'price')
  if (!price) return null

  return createValue(parseFloat(price), 100)
}

export default (dom: Stage1PluginData): Value => getValue(dom) || createValue(0, 0)
