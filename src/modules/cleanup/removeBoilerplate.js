// @flow
import type { Stage1PluginData } from '../../../types/plugin'

export default function removeBoilerplate(dom: Stage1PluginData): Stage1PluginData {
  dom
    .find(
      'input, button, menu, br, footer, nav, noscript, applet, embed, canvas, audio, hr, aside, form, style'
    )
    .remove()

  const classesIds = ['header', 'footer', 'search']
  const classes = '.' + classesIds.join(', .')
  const ids = '#' + classesIds.join(', #')
  dom.find(classes).remove()
  dom.find(ids).remove()
  dom.find('[style*="display: none"], [onclick], img[alt=""]').remove()
  return dom
}
