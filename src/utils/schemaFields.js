// @flow
import type { Value } from '../../types/plugin'
import schema from './schema.json'

export default (): Array<string> => {
  if (!schema) return []
  return schema['@graph']
    .filter(node => node['@type'] === 'rdf:Property')
    .map(node => node['rdfs:label'])
}
