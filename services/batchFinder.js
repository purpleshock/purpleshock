const { Batch } = require('../models')

async function findByCreationTime (from, to, pagination) {
  from = from && from.toDate()
  to = to && to.toDate()

  const where = {}
  if (from && to) {
    where.createdAt = { $between: [from, to] }
  } else if (from) {
    where.createdAt = { $gte: from }
  } else if (to) {
    where.createdAt = { $lte: to }
  }

  const batches = await Batch.findAll({
    where,
    limit: pagination.size,
    offset: (pagination.page - 1) * pagination.size
  })

  return batches.map(batch => batch.toJSON())
}

async function findBetweenValidTime (validAt, expiredAt, pagination) {
  validAt = validAt && validAt.toDate()
  expiredAt = expiredAt && expiredAt.toDate()

  const where = {}
  if (validAt && expiredAt) {
    where.validAt = { $gte: validAt }
    where.expiredAt = { $lte: expiredAt }
  } else if (validAt) {
    where.validAt = { $gte: validAt }
  } else if (expiredAt) {
    where.expiredAt = { $lte: expiredAt }
  }

  const batches = await Batch.findAll({
    where,
    limit: pagination.size,
    offset: (pagination.page - 1) * pagination.size
  })

  return batches.map(batch => batch.toJSON())
}

module.exports = {
  findByCreationTime,
  findBetweenValidTime
}