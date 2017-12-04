// @flow

import { createValue, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage2PluginData, Value } from '../../../types/plugin'

const KEY = 'name'

export default function name({ dom, results }: Stage2PluginData): Stage2PluginData {
  const pageTitle = dom.find('title')[0].innerText

  const titleSeparators = ['|', '-', '–']

  const separated = titleSeparators.map(x => pageTitle.split(x).map(y => cleanupString(y.trim())))

  return { dom, results: [...results, createValue(KEY, '', 0)] }
}
