exports.up = async knex => {
  await knex.schema.createTable('admins', table => {
    table.increments('adminId').primary()
    table.date('createdAt')
    table.date('loginAt')
    table.string('mail')
    table.string('password')

    table.unique('mail')
  })
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('admins')
}
