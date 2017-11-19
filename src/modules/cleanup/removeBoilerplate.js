export default function removeBoilerplate(dom) {
  console.log('REMOVING BOILERPLATE')
  dom
    .find(
      'a, input, button, menu, br, footer, nav, script, noscript, applet, embed, canvas, audio, iframe, hr, aside, form, style'
    )
    .remove()

  const classesIds = ['header', 'footer', 'search', 'banner', 'promo']
  const classes = '.' + classesIds.join(', .')
  const ids = '#' + classesIds.join(', #')
  dom.find(classes).remove()
  dom.find(ids).remove()
  dom.find('[style*="display: none"]').remove()
  dom.find('[onclick]').remove()
  dom.find('img[alt=""]').remove()
  return dom
}
