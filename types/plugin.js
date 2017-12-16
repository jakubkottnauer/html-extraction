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

export type Plugin = Stage1Plugin | Stage2Plugin | Stage3Plugin

export type Stage1Plugin = (
  Stage1PluginData
) => Stage1PluginData

export type Stage2Plugin = (
  Stage2PluginData
) => Stage2PluginData

export type Stage3Plugin = (
  Stage3PluginData
) => Stage3PluginData
