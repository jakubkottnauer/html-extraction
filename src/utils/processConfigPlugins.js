// @flow

import * as stage1Plugins from '../modules/cleanup'
import * as stage2Plugins from '../modules/extraction'
import type { Plugin, Stage1PluginData, Stage2PluginData } from '../../types/plugin'
import type { StageConfig } from '../../types/config'

const builtInPlugins = {
  stage1: stage1Plugins,
  stage2: stage2Plugins,
}

function loadBuiltinPlugins(stage: number, pipeline: Array<Plugin | string>): Array<Plugin> {
  const noop: Plugin = stage === 1 ? (x: Stage1PluginData) => x : (x: Stage2PluginData) => x
  return pipeline.map(p => {
    if (typeof p === 'function') return p
    if (typeof p === 'string') {
      const plugin = builtInPlugins[`stage${stage}`][p]
      if (!plugin) {
        console.warn(
          `Plugin '${p}' not found in built-in 'stage${stage}' plugins. Using noop instead.`
        )
        return noop
      }
      return plugin
    }
    console.log(`Unsupported plugin type '${typeof p} in 'stage${stage}'. Using noop instead.`)
    return noop
  })
}

export default function processConfigPlugins(
  stage: number,
  defaults: Array<Plugin>,
  config: ?StageConfig
) {
  let plugins = [...defaults]
  console.log('CONFIG: ', config)
  if (config && config.plugins) {
    if (config.append) {
      plugins = [...plugins, ...config.plugins]
    } else {
      plugins = [...config.plugins]
    }
  }

  return loadBuiltinPlugins(stage, plugins)
}
