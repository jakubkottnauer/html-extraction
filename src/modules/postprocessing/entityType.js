// @flow

import valueCreator from '../../utils/valueCreator'
import type { Stage3PluginData } from '../../../types/plugin'
import { entityTypes } from '../../constants'

const createValue = valueCreator('entityType')

const some = (results, key) => results.some(x => x.key === key && x.confidence > 0)

export default (results: Stage3PluginData): Stage3PluginData => {
  let type = null

  if (some(results, 'entityType')) return results

  if (some(results, 'price') || some(results, 'currency').value) {
    type = entityTypes.product
  }

  return [...results, createValue(type || entityTypes.article, type ? 100 : 10)]
}
