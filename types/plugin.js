// @flow
export type Stage1PluginData = Object

export type Value = {
  confidence: number,
  key: string,
  value: string | number,
}

export type Stage2PluginData = Array<Value>

export type Stage3PluginData = Array<Value>

export type Plugin = Stage1Plugin | Stage2Plugin | Stage3Plugin

export type Stage1Plugin = Stage1PluginData => Stage1PluginData

export type Stage2Plugin = Stage1PluginData => Value

export type Stage3Plugin = Stage3PluginData => Stage3PluginData
