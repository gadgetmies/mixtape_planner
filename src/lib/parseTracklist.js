import assert from 'assert'

export default tracklist => {
  const rows = tracklist
    .trim()
    .split('\n')
    .map(l => l.trim().split('\t'))

  if (rows.length === 0) return []
  const headers = rows[0]
  const validRows = rows.filter(r => r.length === headers.length)
  assert(headers[0] === 'Artist')
  assert(headers[1] === 'Title')
  assert(headers[2] === 'Key')

  const propertyNames = headers.slice(3)

  return validRows
    .slice(1)
    .map(([title, artist, key, ...propertyValues]) => {
      try {
        return {
          title,
          artist,
          keyNumber: parseInt(key.slice(0, -1)),
          isMinor: key[key.length - 1] === 'A',
          properties: Object.fromEntries(propertyValues.map((value, i) => [propertyNames[i], value.match(/(\d+)$/)[1]]))
        }
      } catch (e) {
        console.error(`Error processing row: ${title} ${artist} ${key} ${propertyValues}`)
      }
    })
}
