// @flow
export type Stage1PluginData = Object

export type Value = {
  key: string,
  confidence: number,
  value: string | number,
}

export type Stage2PluginData = {
  dom: Object,
  results: Array<Value>,
}

export type Stage3PluginData = Array<Value>

export type Plugin = (
  Stage1PluginData | Stage2PluginData | Stage3PluginData
) => Stage1PluginData | Stage2PluginData | Stage3PluginData
