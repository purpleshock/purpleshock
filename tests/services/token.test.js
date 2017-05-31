const test = require('ava')
const { token } = require('../../services')

test('#grantPlayer', async t => {
  const player = {
    id: 'playerId',
    displayName: 'player'
  }
  const secretToken = await token.grantPlayer(player)
  const extractPlayer = await token.extractToken(secretToken)
  t.is(typeof secretToken, 'string')
  t.is(extractPlayer.playerId, player.playerId)
})

test('#grantAdmin', async t => {
  const admin = {
    id: 'adminId'
  }
  const secretToken = await token.grantAdmin(admin)
  const extractAdmin = await token.extractToken(secretToken)
  t.is(typeof secretToken, 'string')
  t.is(extractAdmin.adminId, admin.adminId)
})
