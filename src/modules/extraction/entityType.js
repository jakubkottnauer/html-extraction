// @flow

import { valueCreator, cleanupString } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { entityTypes } from '../../constants'

const createValue = valueCreator('entityType')

export default (dom: Stage2PluginData): Value | Array<Value> => {
  if (dom.find('video').length > 0) {
    return createValue(entityTypes.video, 70)
  }

  if (
    dom.find('link[type="application/rss+xml"]').length > 0 ||
    dom.find('link[type="application/atom+xml"]').length > 0
  ) {
    return createValue(entityTypes.article, 50)
  }

  return createValue(null, 0)
}
