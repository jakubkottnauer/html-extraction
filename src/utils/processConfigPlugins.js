export default function processConfigPlugins(defaults, config) {
  let plugins = [...defaults]
  if (config && config.plugins) {
    if (config.append) {
      plugins = [...plugins, ...config.plugins]
    } else {
      plugins = [...config.plugins]
    }
  }

  return plugins
}
