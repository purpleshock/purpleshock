const express = require('express')
const wrap = require('../wrap')
const { permission, batch, batchFinder } = require('../../services')
const formatters = require('../formatters')
const {
  batchResponse,
  createBatchBody,
  createBatchResponse,
  findBatchesQuery,
  findBatchesResponse
} = require('../formatters/batches')

const batches = express.Router()

batches.get('/',
  permission.getCheckScopesMiddleware(['batches.find']),
  formatters.validateQuery(findBatchesQuery),
  wrap(async (req, res, next) => {
    const { validAt, expiredAt, page, size } = req.query
    const foundBatches = await batchFinder.findBetweenValidTime(validAt, expiredAt, {
      page,
      size
    })
    const response = await formatters.validate(foundBatches, findBatchesResponse)
    res.json(response)
  })
)

batches.post('/',
  permission.getCheckScopesMiddleware(['batches.create']),
  formatters.valdateBody(createBatchBody),
  wrap(async (req, res, next) => {
    const createdBatch = await batch.createBatch(req.user.adminId, req.body)
    const response = await formatters.validate(createdBatch, createBatchResponse)
    res.json(response)
  })
)

batches.get('/:code',
  permission.getCheckScopesMiddleware(['batches.find']),
  wrap(async (req, res, next) => {
    const foundBatch = await batchFinder.findByCode(req.params.code)
    const response = await formatters.validate(foundBatch, batchResponse)
    res.json(response)
  })
)

module.exports = batches
