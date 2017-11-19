// @flow

export default function cleanupString(str: string = '') {
  return str
    .replace(/&nbsp/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
