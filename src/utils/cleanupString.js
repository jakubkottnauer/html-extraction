export default function cleanupString(str = '') {
  return str
    .replace(/&nbsp/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
