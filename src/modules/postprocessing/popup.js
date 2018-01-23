// @flow

import type { Stage3PluginData } from '../../../types/plugin'

export default (dom: JQuery) => (results: Stage3PluginData): Stage3PluginData => {
  dom
    .find('body')
    .eq(0)
    .append(
      `<div style="
        position: fixed;
        color: black;
        z-index: 99999;
        bottom: 0;
        right: 0;
        width: 500px;
        height: auto;
        padding: 10px;
        background-color: #f2f4ee;
        border: 1px solid black;">
          <p><b>Extraction results</b></p>
          <ul>
            ${results.reduce(
              (acc, x) =>
                acc + `<li>${x.key} - ${x.value} (${x.extractor}) - ${x.confidence} %</li>`,
              ''
            )}
          </ul>
      </div>`
    )

  return results
}
