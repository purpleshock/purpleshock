const test = require('ava')
const purify = require('../../utils/purify')

test('create an object purify function that clear fields which was not included', t => {
  const purifier = purify.getPropertiesFilterFn('keepThis', 'keepThat')
  const origin = {
    keepThis: 'keep-this',
    keepThat: 'keep-that',
    removeThis: 'remove-this',
    removeThat: 'remove-that'
  }
  const result = purifier(origin)

  t.deepEqual(result, {
    keepThis: 'keep-this',
    keepThat: 'keep-that'
  })
})

test('pickup listed fields that are changed', t => {
  const a = {
    fieldThatChanged: 'field-that-changed',
    fieldTahtNotListed: 'field-that-not-listed',
    fieldThatListedWithoutChanged: 'field-that-listed-without-changed'
  }
  const b = {
    fieldThatChanged: 'field-changed',
    fieldThatListedWithoutChanged: 'field-that-listed-without-changed',
    fieldNotInOrigin: 'field-not-in-origin'
  }
  const result = purify.diff(a, b)

  t.deepEqual(result, {
    fieldThatChanged: 'field-changed'
  })
})
