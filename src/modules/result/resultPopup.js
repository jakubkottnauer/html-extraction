// @flow

import { pipe, groupBy, prop, pluck, map, sortBy, negate, pick, values } from 'ramda'
import { cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage3PluginData } from '../../../types/plugin'

export default (dom: JQuery) => (results: Stage3PluginData): Stage3PluginData => {
  console.log('WUUUUUTß')
  console.log(dom.find('body').eq(0))
  dom.append(
    '<div style="position: absolute; bottom: 0; right: 0; width: 200px; height: 150px;">hello</div>'
  )

  return results
}
