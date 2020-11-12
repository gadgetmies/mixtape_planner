import assert from 'assert'
import { isSuitableKey } from '../lib/keys'

assert(isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 1, isMinor: false }, true))
assert(isSuitableKey({ keyNumber: 1, isMinor: false }, { keyNumber: 1, isMinor: true }, true))
assert(isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 1, isMinor: true }, true))
assert(isSuitableKey({ keyNumber: 1, isMinor: false }, { keyNumber: 1, isMinor: false }, true), true)

assert(isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 1, isMinor: true }, true))
assert(isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 11, isMinor: true }, true), true)

assert(!isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 3, isMinor: true }, true))
assert(!isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 3, isMinor: false }, true))
assert(!isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 10, isMinor: true }, true))
assert(!isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 10, isMinor: false }, true), true)

assert(!isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 1, isMinor: false }, true))
assert(!isSuitableKey({ keyNumber: 0, isMinor: false }, { keyNumber: 1, isMinor: true }, true))
assert(!isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 11, isMinor: false }, true))
assert(!isSuitableKey({ keyNumber: 0, isMinor: false }, { keyNumber: 11, isMinor: true }, true))

assert(isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 1, isMinor: false }))
assert(isSuitableKey({ keyNumber: 1, isMinor: false }, { keyNumber: 1, isMinor: true }))
assert(isSuitableKey({ keyNumber: 1, isMinor: true }, { keyNumber: 1, isMinor: true }))
assert(isSuitableKey({ keyNumber: 1, isMinor: false }, { keyNumber: 1, isMinor: false }))

assert(isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 1, isMinor: true }))
assert(isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 11, isMinor: true }))

assert(!isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 2, isMinor: true }))
assert(!isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 2, isMinor: false }))
assert(!isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 10, isMinor: true }))
assert(!isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 10, isMinor: false }))

assert(isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 1, isMinor: false }))
assert(isSuitableKey({ keyNumber: 0, isMinor: false }, { keyNumber: 1, isMinor: true }))
assert(isSuitableKey({ keyNumber: 0, isMinor: true }, { keyNumber: 11, isMinor: false }))
assert(isSuitableKey({ keyNumber: 0, isMinor: false }, { keyNumber: 11, isMinor: true }))
