// @flow

import { createValue, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage2PluginData, Value } from '../../../types/plugin'

const KEY = 'name'

function getSchemaOrgValue(dom): ?Value {
  const name = getItemProp(dom, 'name')
  if (!name) return null
  return createValue(KEY, name, 100)
}

export default function name({ dom, results }: Stage2PluginData): Stage2PluginData {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return { dom, results: [...results, metadata] }
  }

  const headings = dom.find('h1')
  if (headings.length === 0) {
    return { dom, results: [...results, createValue(KEY, 'no name', 0)] }
  }

  if (headings.length === 1) {
    return {
      dom,
      results: [...results, createValue(KEY, cleanupString(headings[0].innerText), 90)],
    }
  }

  const pageTitle = dom.find('title')[0].innerText

  const titleSeparators = ['|', '-', '–']

  const separated = titleSeparators.map(x => pageTitle.split(x).map(y => cleanupString(y.trim())))

  return { dom, results: [...results, createValue(KEY, '', 0)] }
}
