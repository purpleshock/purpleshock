const knex = require('./knex')

function create (adminId, code, rest = {}) {
  const { expiredAt, validAt, description } = rest
  const now = new Date()
  const data = {
    adminId,
    code,
    createdAt: now,
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

function countBetweenValidDuration (validAt, expiredAt) {
  return select()
    .where('validAt', '>=', validAt.toDate())
    .andWhere('expiredAt', '<=', expiredAt.toDate())
    .count('batches.batchId AS count')
    .then(([result]) => result.count)
}

function countAfterValidTime (validAt) {
  return select()
    .where('validAt', '>=', validAt.toDate())
    .count('batches.batchId AS count')
    .then(([result]) => result.count)
}

function countBeforeExpiredTime (expiredAt) {
  return select()
    .where('expiredAt', '<=', expiredAt.toDate())
    .count('batches.batchId AS count')
    .then(([result]) => result.count)
}

function findBetweenValidDuration (validAt, expiredAt, offset, size) {
  return select()
    .where('validAt', '>=', validAt.toDate())
    .andWhere('expiredAt', '<=', expiredAt.toDate())
    .offset(offset)
    .limit(size)
}

function findAfterValidTime (validAt, offset, size) {
  return select()
    .where('validAt', '>=', validAt.toDate())
    .offset(offset)
    .limit(size)
}

function findBeforeExpiredTime (expiredAt, offset, size) {
  return select()
    .where('expiredAt', '<=', expiredAt.toDate())
    .offset(offset)
    .limit(size)
}

module.exports = {
  create,
  findByCode,
  findByCodeTerm,
  countBetweenValidDuration,
  countAfterValidTime,
  countBeforeExpiredTime,
  findBetweenValidDuration,
  findAfterValidTime,
  findBeforeExpiredTime
}
