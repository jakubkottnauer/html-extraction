// @flow

import type { Config } from '../../types/config'

export default function getConfig(): Config {
  return window.extractorConfig || {}
}
