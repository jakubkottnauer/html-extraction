// @flow
import type { Stage1PluginData } from '../../../types/plugin'

export default function removeSocial(dom: Stage1PluginData): Stage1PluginData {
  console.log('REMOVING SOCIAL ICONS')
  dom.find('.socialAndRankPanel').remove() // alza rating and social icons

  return dom
}
