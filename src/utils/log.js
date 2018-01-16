export const prefix = 'extractlog'

export default function log(data) {
  console.log(prefix, JSON.stringify(data))
  return data
}
