const generateTracks = n => {
  return Array.from(Array(n).keys()).map(n => ({
    keyNumber: Math.round(Math.random() * 12),
    isMinor: Math.random() < 0.5,
    name: n,
    popularity: Math.random(),
    energy: Math.random()
  }))
}
