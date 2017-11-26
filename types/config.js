// @flow

import type { Plugin } from './plugin'

export type StageConfig = {
  append: ?boolean,
  plugins: ?Array<Plugin | string>,
}

export type Config = {
  stage1?: StageConfig,
  stage2?: StageConfig,
  stage3?: StageConfig,
}
