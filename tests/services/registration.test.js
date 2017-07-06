const test = require('ava')
const { sequelize } = require('../../models/dao')
const { registration } = require('../../services')

test.before(t => sequelize.sync({ force: true }))

test('#registerUUIdPlayer', async t => {
  const player = await registration.registerUUIdPlayer({
    displayName: 'Somebody'
  })

  t.is(player.playerId, player.identity.uuid.playerId)
  t.truthy(player.identity.uuid)
})

test('#registerAdmin', async t => {
  const mail = 'admin@purpleshock.org'
  const password = 'pas2vv0rd'
  const admin = await registration.registerAdmin(mail, password)

  t.truthy(admin.adminId)
})
