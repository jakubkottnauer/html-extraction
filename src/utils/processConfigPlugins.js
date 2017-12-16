// @flow

import * as stage1Plugins from '../modules/cleanup'
import * as stage2Plugins from '../modules/extraction'
import * as stage3Plugins from '../modules/result'
import type {
  Plugin,
  Stage1PluginData,
  Stage2PluginData,
  Stage3PluginData,
  Stage1Plugin,
} from '../../types/plugin'
import type { StageConfig } from '../../types/config'

const builtInPlugins = {
  stage1: stage1Plugins,
  stage2: stage2Plugins,
  stage3: stage3Plugins,
}

const noop: Stage1Plugin = (x: Stage1PluginData) => x

function loadBuiltinPlugins(stage: number, pipeline: Array<Plugin | string>): Array<Plugin> {
  return pipeline.map(p => {
    if (typeof p === 'function') return p
    if (typeof p === 'string') {
      const plugin: Plugin = builtInPlugins[`stage${stage}`][p]
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

  if (config && config.plugins) {
    plugins = config.append ? [...plugins, ...config.plugins] : [...config.plugins]
  }

  return loadBuiltinPlugins(stage, plugins)
}
