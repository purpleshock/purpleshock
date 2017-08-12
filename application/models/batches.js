const knex = require('./knex')

function create (adminId, code, rest = {}) {
  const { createdAt, expiredAt, validAt, description } = rest
  const data = {
    adminId,
    code,
    createdAt: createdAt || new Date(),
    expiredAt,
    validAt,
    description
  }
  return knex
    .insert(data)
    .into('batches')
    .then(([batchId]) => {
      return Object.assign(data, {
        batchId
      })
    })
}

function select () {
  return knex
    .select('batches.*')
    .from('batches')
}

function findByCode (code) {
  return select()
    .where('batches.code', code)
    .then(([batch]) => batch)
}

function findByCodeTerm (term, size) {
  return select()
    .where('batches.code', 'like', term + '%')
    .limit(size)
}

function findBetweenValidDuration (validAt, expiredAt, offset, size) {
  return select()
    .where('validAt', '>=', validAt.toDate())
    .andWhere('expiredAt', '<=', expiredAt.toDate())
    .orderBy('batches.createdAt', 'desc')
    .offset(offset)
    .limit(size)
}

function findBetweenCreationDuration (createDateFrom, createDateTo, offset, size) {
  return select()
    .where('batches.createdAt', '>=', createDateFrom.toDate())
    .andWhere('batches.createdAt', '<=', createDateTo.toDate())
    .orderBy('batches.createdAt', 'desc')
    .offset(offset)
    .limit(size)
}

module.exports = {
  create,
  findByCode,
  findByCodeTerm,
  findBetweenValidDuration,
  findBetweenCreationDuration
}
