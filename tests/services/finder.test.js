const test = require('ava')
const { sequelize } = require('../../models')
const { finder, registration } = require('../../services')

let player

test.before(async t => {
  await sequelize.sync({ force: true })
  player = await registration.registerUUIdPlayer({
    displayName: 'Somebody'
  })
})

test('#findUUIdPlayer', async t => {
  const { uuid } = player.identity.uuid
  const foundPlayer = await finder.findUUIdPlayer(uuid)

  t.is(foundPlayer.id, player.id)
})
