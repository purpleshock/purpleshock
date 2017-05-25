const test = require('ava')
const token = require('./token')

test('#grantPlayer', async t => {
  const player = {
    id: 'playerId',
    displayName: 'player'
  }
  const secretToken = await token.grantPlayer(player)
  const extractPlayer = await token.extractToken(secretToken)
  t.is(typeof secretToken, 'string')
  t.is(extractPlayer.id, player.id)
})
