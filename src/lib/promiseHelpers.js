export const promiseOrTimeout = (fn, timeout) => {
  let timeoutId
  return Promise.race([
    new Promise(accept => timeoutId = setTimeout(() => {
      console.log('Timeout!')
      return accept()
    }, timeout)),
    new Promise(async accept => {
      const result = await fn()
      console.log('Done')
      clearTimeout(timeoutId)
      // TODO: this does not seem to work
      return accept(result)
    })]
  )
}
