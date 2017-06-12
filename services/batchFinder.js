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

  const numTotal = await Batch.count({
    where
  })

  const batches = await Batch.findAll({
    where,
    limit: pagination.size,
    offset: (pagination.page - 1) * pagination.size
  })

  return {
    numTotal,
    batches: batches.map(batch => batch.toJSON())
  }
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

  const numTotal = await Batch.count({
    where
  })

  const batches = await Batch.findAll({
    where,
    limit: pagination.size,
    offset: (pagination.page - 1) * pagination.size
  })

  return {
    numTotal,
    batches: batches.map(batch => batch.toJSON())
  }
}

async function findById (batchId) {
  const batch = await Batch.findById(batchId)
  return batch && batch.toJSON()
}

async function findByCode (code) {
  const batch = await Batch.find({
    where: {
      code
    }
  })
  return batch && batch.toJSON()
}

module.exports = {
  findByCreationTime,
  findBetweenValidTime,
  findById,
  findByCode
}
