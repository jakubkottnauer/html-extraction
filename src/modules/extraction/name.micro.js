// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('name', 'name.meta')

function getValue(dom): ?Value {
  const name = getMicrodataValue(dom, 'name')
  if (!name) return null
  return createValue(name, 100)
}

export default (dom: Stage1PluginData): Value => getValue(dom) || createValue('', 0)
