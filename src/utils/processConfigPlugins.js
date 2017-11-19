import * as stage1Plugins from '../modules/cleanup'
import * as stage2Plugins from '../modules/extraction'

const builtInPlugins = {
  stage1: stage1Plugins,
  stage2: stage2Plugins,
}

function loadBuiltinPlugins(stage, pipeline) {
  return pipeline.map(p => {
    if (typeof p === 'function') return p
    if (typeof p === 'string') {
      const plugin = builtInPlugins[`stage${stage}`][p]
      if (!plugin) {
        console.warn(
          `Plugin '${p}' not found in built-in 'stage${stage}' plugins. Using noop instead.`
        )
        return x => x
      }
      return plugin
    }
  })
}

export default function processConfigPlugins(stage, defaults, config) {
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
