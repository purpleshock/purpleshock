const test = require('ava')
const { sequelize } = require('../../models/dao')
const { finder, registration } = require('../../services')

const mail = 'admin@purpleshock.org'
const password = 'pas2vv0rd'

let player

test.before(async t => {
  await sequelize.sync({ force: true })

  await registration.registerAdmin(mail, password)

  player = await registration.registerUUIdPlayer({
    displayName: 'Somebody'
  })
})

test('#findAdminByMail', async t => {
  const admin = await finder.findAdminByMail(mail, password)

  t.truthy(admin.adminId)
  t.not(admin.password, password)
})

test('#findUUIdPlayer', async t => {
  const { uuid } = player.identity.uuid
  const foundPlayer = await finder.findUUIdPlayer(uuid)

  t.is(foundPlayer.adminId, player.adminId)
})
