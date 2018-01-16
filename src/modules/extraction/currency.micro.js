// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('currency', 'currency.micro')

function getValue(dom): ?Value {
  const value = getMicrodataValue(dom, 'currency') || getMicrodataValue(dom, 'priceCurrency')
  if (!value) return null
  return createValue(value, 100)
}

export default (dom: Stage2PluginData): Value => getValue(dom) || createValue('', 0)
