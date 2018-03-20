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
        max-height: 500px;
        overflow: scroll;
        padding: 10px;
        font-size: 13px;
        font-family: arial;
        background-color: #f2f4ee;
        text-align:left;
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
