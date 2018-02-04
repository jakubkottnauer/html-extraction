// @flow

import { pipe, groupBy, prop, pluck, map, sortBy, negate, values } from 'ramda'
import type { Stage3PluginData } from '../../../types/plugin'

export default (dom: JQuery) => (results: Stage3PluginData): Stage3PluginData => {
  const process = pipe(
    groupBy(prop('key')),
    map(sortBy(pipe(prop('confidence'), negate))),
    pluck(0),
    values
  )

  return process(results)
}
