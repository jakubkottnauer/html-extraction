// @flow
import type { Stage1PluginData } from '../../../types/plugin'

export default function removeSocial(dom: Stage1PluginData): Stage1PluginData {
  dom.find('.socialAndRankPanel').remove() // alza rating and social icons
  dom.find('iframe.fb_ltr').remove() // Facebook comment section
  dom.find('iframe.blogger-iframe-colorize').remove() // Blogger comment section
  console.log(dom.find('iframe'))
  return dom
}
