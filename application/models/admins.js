const knex = require('./knex')

function create (mail, password) {
  const now = new Date()
  return knex.insert({
    createdAt: now,
    loginAt: now,
    mail,
    password
  })
  .into('admins')
  .then(([adminId]) => adminId)
}

function findByMail (mail) {
  return knex
    .select()
    .from('admins')
    .where('mail', mail)
    .then(([user]) => user)
}

module.exports = {
  create,
  findByMail
}
