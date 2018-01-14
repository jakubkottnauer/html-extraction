// @flow

import { valueCreator, cleanupString, getMetaValue } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('description', 'description.meta')

function getValue(dom): ?Value {
  const value = getMetaValue(dom, 'description')
  if (!value) return null
  return createValue(value, 100)
}

function getOgValue(dom): ?Value {
  const value = getMetaValue(dom, 'og:description')
  if (!value) return null
  return createValue(value, 100)
}

export default (dom: Stage2PluginData): Value =>
  getValue(dom) || getOgValue(dom) || createValue('', 0)
