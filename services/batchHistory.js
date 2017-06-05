const { Batch } = require('../models')

async function findByCreationTime (duration, pagination) {
  const batches = await Batch.findBetweenCreationTime(duration, pagination)
  return batches.map(batch => batch.toJSON())
}

module.exports = {
  findByCreationTime
}
