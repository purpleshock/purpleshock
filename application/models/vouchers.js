const knex = require('./knex')
const purify = require('../utils/purify')

function create (batchId, code, amount, status) {
  return knex
    .insert({
      batchId,
      code,
      amount,
      status
    })
    .into('vouchers')
    .then(([voucherId]) => {
      return {
        voucherId,
        code,
        amount,
        status
      }
    })
}

function createMulti (voucherDatas, chunkSize) {
  return knex
    .batchInsert('vouchers', voucherDatas, chunkSize)
    .returning('voucherId')
}

const updateDataPurifier = purify.getPropertiesFilterFn('amount', 'status')

function update (code, nextData) {
  nextData = updateDataPurifier(nextData)
  return knex('vouchers')
    .where('code', code)
    .update(nextData)
    .then(numAffect => {
      if (numAffect === 0) {
        const err = new Error('Not rows affected')
        return Promise.reject(err)
      } else {
        return Object.assign(nextData, {
          code
        })
      }
    })
}

function select () {
  return knex
    .select('vouchers.*', 'batches.code AS batch')
    .from('vouchers')
    .innerJoin('batches', 'batches.batchId', 'vouchers.batchId')
}

function findByCodeTerm (term, size) {
  return select()
    .where('vouchers.code', 'like', term + '%')
    .limit(size)
}

function findByCode (code, size) {
  return select()
    .where('vouchers.code', code)
    .then(([voucher]) => voucher)
}

function findByBatch (batchCode, offset, size) {
  return select()
    .where('batches.code', batchCode)
    .offset(offset)
    .limit(size)
}

function countByBatch (batchCode) {
  return select()
    .where('batches.code', batchCode)
    .count('vouchers.voucherId AS count')
    .then(([result]) => result.count)
}

module.exports = {
  create,
  createMulti,
  update,
  findByCodeTerm,
  findByCode,
  findByBatch,
  countByBatch
}
