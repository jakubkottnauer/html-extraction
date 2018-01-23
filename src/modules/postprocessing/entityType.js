// @flow

import valueCreator from '../../utils/valueCreator'
import type { Stage3PluginData } from '../../../types/plugin'

const createValue = valueCreator('entityType')

const find = (results, val) => (results.find(x => x.key === 'price') || {}).value

export default (results: Stage3PluginData): Stage3PluginData => {
  let type = ''

  if (find(results, 'price') || find(results, 'currency')) {
    type = 'product'
  }

  return [...results, createValue(type, type ? 100 : 0)]
}
