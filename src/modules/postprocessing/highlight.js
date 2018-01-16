// @flow

import { pipe, groupBy, prop, pluck, map, sortBy, negate, pick, values } from 'ramda'
import { cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage3PluginData } from '../../../types/plugin'

export default (dom: JQuery) => (results: Stage3PluginData): Stage3PluginData => {
  results.forEach(x => {
    if (x.selector) {
      dom
        .find(x.selector)
        .eq(0)
        .css('border', '2px solid red')
    }
  })

  return results
}
