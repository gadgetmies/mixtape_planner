import { getKeyString } from './keys'

const pathToTSV = (path) => {
  const header = `Artist\tTitle\tKey\t${Object.keys(path[0].properties).join('\t')}`
  const tracks = path
    .map(
      ({ title, artist, keyNumber, isMinor, properties }) =>
        `${artist}\t${title}\t${getKeyString(keyNumber, isMinor)}\t${Object.values(properties).join('\t')}`
    )
    .join('\n')

  return `${header}\n${tracks}`
}

export default pathToTSV
