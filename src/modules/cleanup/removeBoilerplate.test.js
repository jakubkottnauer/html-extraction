import $ from '../../../lib/jquery'

import removeBoilerplate from './removeBoilerplate'

describe('removeBoilerplate', () => {
  it('removes inputs', () => {
    document.body.innerHTML = `<html><div>
      <p id="mytext">myText</p>
      <input id="username" />
    </div>
    </html>`

    const newDom = removeBoilerplate($('html'))
    expect(newDom.find('#username')).toHaveLength(0)
    expect(newDom.find('#mytext')).toHaveLength(1)
  })
})

