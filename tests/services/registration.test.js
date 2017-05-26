const test = require('ava')
const { sequelize } = require('../../models')
const { registration } = require('../../services')

test.before(t => sequelize.sync({ force: true }))

test('#registerUUIdPlayer', async t => {
  const player = await registration.registerUUIdPlayer({
    displayName: 'Somebody'
  })

  t.is(player.id, player.identity.uuid.playerId)
  t.truthy(player.identity.uuid)
})
