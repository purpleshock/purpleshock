const test = require('ava')
const enums = require('../../utils/enums')

test('construct enums from array', t => {
  const ens = enums(['INITIALIZED', 'VALIDATED', 'INVALIDATED'])
  t.is(ens.INITIALIZED, 0)
  t.is(ens.VALIDATED, 1)
  t.is(ens.INVALIDATED, 2)
})

test('get enum literal from value', t => {
  const ens = enums(['INITIALIZED', 'VALIDATED', 'INVALIDATED'])
  t.is(ens[ens.INITIALIZED], 'INITIALIZED')
  t.is(ens[ens.VALIDATED], 'VALIDATED')
  t.is(ens[ens.INVALIDATED], 'INVALIDATED')
})

test('throw error when enum literal is repeated', t => {
  const err = t.throws(() => {
    enums(['INITIALIZED', 'INITIALIZED'])
  })
  t.is(err.message, 'INITIALIZED is repeated')
})

test('throw error when enum literal and enum value is repeated', t => {
  const err = t.throws(() => {
    enums(['INITIALIZED', 0])
  })
  t.is(err.message, '0 is repeated')
})
