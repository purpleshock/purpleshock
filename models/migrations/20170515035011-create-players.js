exports.up = async knex => {
  await knex.schema.createTable('players', table => {
    table.increments('playerId').primary()
    table.date('createdAt')
    table.date('loginAt')
    table.string('displayName')
  })

  await knex.schema.createTable('uuidIdentities', table => {
    table.string('uuid').primary()
    table.integer('playerId').references('playerId').inTable('players')
  })

  await knex.schema.createTable('wallets', table => {
    table.increments('walletId').primary()
    table.integer('balance').notNullable().defaultTo(0)
    table.integer('playerId').notNullable().references('playerId').inTable('players')
  })
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('players')
  await knex.schema.dropTableIfExists('uuidIdentities')
  await knex.schema.dropTableIfExists('wallets')
}
