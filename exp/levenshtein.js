// @flow

export default function levenshtein(a: string, b: string): number {
  let tmp
  if (a.length === 0) {
    return b.length
  }
  if (b.length === 0) {
    return a.length
  }
  if (a.length > b.length) {
    tmp = a
    a = b
    b = tmp
  }

  let i,
    j,
    res = 0,
    alen = a.length,
    blen = b.length,
    row = Array(alen)
  for (i = 0; i <= alen; i++) {
    row[i] = i
  }

  for (i = 1; i <= blen; i++) {
    res = i
    for (j = 1; j <= alen; j++) {
      tmp = row[j - 1]
      row[j - 1] = res
      res = b[i - 1] === a[j - 1] ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1))
    }
  }
  return res
}
