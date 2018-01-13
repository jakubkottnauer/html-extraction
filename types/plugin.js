// @flow

export type Value = {
  confidence: number,
  key: string,
  value: string | number,
}

export type Stage1PluginData = JQuery
export type Stage2PluginData = JQuery
export type Stage3PluginData = Array<Value>

export type Plugin = Stage1Plugin | Stage2Plugin | Stage3Plugin

export type Stage1Plugin = Stage1PluginData => Stage1PluginData
export type Stage2Plugin = Stage2PluginData => Value
export type Stage3Plugin = Stage3PluginData => Stage3PluginData
