// @flow

import valueCreator from '../../utils/valueCreator'
import type { Stage3PluginData } from '../../../types/plugin'
import { entityTypes } from '../../constants'

const createValue = valueCreator('entityType', 'entityType.post')

const some = (results, key) => results.some(x => x.key === key && x.confidence > 0)
const someEqual = (results, key, equalTo) =>
  results.some(x => x.key === key && x.confidence > 0 && x.value === equalTo)
const someContain = (results, key, val) =>
  results.some(
    x => x.key === key && x.confidence > 0 && (x.value || '').toString().indexOf(val) > 0
  )

export default (dom: JQuery) => (results: Stage3PluginData): Stage3PluginData => {
  let type = null

  if (someContain(results, 'name', '***'))
    return [...results, createValue(entityTypes.vacation, 100)]

  if (
    someEqual(results, 'entityType', 'website') ||
    someEqual(results, 'entityType', 'reportagenewsarticle') ||
    someEqual(results, 'entityType', 'newsarticle')
  )
    return [...results, createValue(entityTypes.article, 100)]

  if (someEqual(results, 'entityType', 'organization'))
    return [...results, createValue(entityTypes.video, 100)]

  if (someContain(results, 'description', 'video'))
    return [...results, createValue(entityTypes.video, 100)]

  if (some(results, 'entityType')) return results

  if (some(results, 'price') || some(results, 'currency')) {
    type = entityTypes.product
  }

  if (some(results, 'type'))
    return [...results, createValue((results.find(r => r.key === 'type') || {}).value, 80)]

  return [...results, createValue(type || entityTypes.article, type ? 100 : 10)]
}
