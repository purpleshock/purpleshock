const batches = require('../models/batches')

const MISSING_DURATION_QUERY = 'MISSING_DURATION_QUERY'

async function findAccordingValidTime (validAt, expiredAt, page, pagination) {
  const offset = (page - 1) * pagination
  return batches.findBetweenValidDuration(validAt, expiredAt, offset, pagination)
}

function findAccordingCreationTime (createDateFrom, createDateTo, page, pagination) {
  const offset = (page - 1) * pagination
  return batches.findBetweenCreationDuration(createDateFrom, createDateTo, offset, pagination)
}

function findByCode (code) {
  return batches.findByCode(code)
}

function findByCodeTerm (term, size) {
  return batches.findByCodeTerm(term, size)
}

module.exports = {
  MISSING_DURATION_QUERY,
  findAccordingValidTime,
  findAccordingCreationTime,
  findByCode,
  findByCodeTerm
}
