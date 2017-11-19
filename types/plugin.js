// @flow
export type Stage1PluginData = Object

export type Stage2PluginData = {
  dom: Object,
  results: Object,
}

export type Plugin = (Stage1PluginData | Stage2PluginData) => Stage1PluginData | Stage2PluginData
