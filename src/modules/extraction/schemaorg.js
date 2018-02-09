// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

export default async (dom: Stage2PluginData): Promise<Value> => {
  const createValue = valueCreator('schemaorg')
  return createValue('no data', 0)
  /*try {
    /*const response = await fetch('http://schema.org/version/latest/schema.jsonld', {

      headers: {
        'Accept': 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
    })
    const data = await response.json();
    console.log(data)
    return createValue('YEEES', 0)
  } catch (e) {
    console.log(e)
    return createValue('fetch error', 0)
  }*/
}
