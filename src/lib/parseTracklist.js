import assert from 'assert'

const parseTracklist = (list) => {
  const rows = list
    .trim()
    .split('\n')
    .map((l) => l.trim().split('\t'))

  if (rows.length === 0) return []
  const headers = rows[0]
  const validRows = rows.filter((r) => r.length === headers.length)
  assert(headers[0].toLowerCase() === 'artist')
  assert(headers[1].toLowerCase() === 'title')
  assert(headers[2].toLowerCase() === 'tempo')
  assert(headers[3].toLowerCase() === 'key' || headers[2] === 'key text')

  const propertyNames = headers.slice(4)

  return validRows.slice(1).map(([artist, title, tempo, key, ...propertyValues]) => {
    try {
      return {
        title,
        artist,
        keyNumber: parseInt(key.slice(0, -1)),
        isMinor: key[key.length - 1] === 'B' || key[key.length - 1] === 'd',
        tempo: parseInt(tempo),
        properties: Object.fromEntries(propertyValues.map((value, i) => [propertyNames[i], value.match(/(\d+)$/)[1]])),
      }
    } catch (e) {
      console.error(`Error processing row: ${title} ${artist} ${key} ${propertyValues}`)
      throw e
    }
  })
}
export default parseTracklist
