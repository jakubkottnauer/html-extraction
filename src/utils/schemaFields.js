// @flow
import type { Value } from '../../types/plugin'

export default async (): Promise<Array<string>> => {
  try {
    const schema = await import(/* webpackChunkName: "schema" */ './schema.json')
    if (!schema) return []
    return schema['@graph']
      .filter(node => node['@type'] === 'rdf:Property')
      .map(node => node['rdfs:label'])
  } catch (e) {
    console.log('Schema.org chunk missing. No schema.org properties will be used.')
    return []
  }
}
