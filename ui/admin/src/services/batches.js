import { fetchJSON } from './fetch'
import formatRequest from '../utils/formatRequest'
import { getResponseFormatter } from '../utils/formatResponse'

const resonseFormatter = getResponseFormatter('createdAt', 'validAt', 'expiredAt')

export function createBatch (formData) {
  return fetchJSON('/api/v1/batches', {
    method: 'POST',
    body: formatRequest(formData)
  })
  .then(response => resonseFormatter(response))
}

export function getBatch (code) {
  return fetchJSON(`/api/v1/batches/${code}`)
  .then(response => resonseFormatter(response))
}

export function getBatches (validAt, expiredAt, page, size) {
  return fetchJSON('/api/v1/batches', {
    query: formatRequest({
      validAt,
      expiredAt,
      page,
      size
    })
  })
  .then(response => {
    return {
      ...response,
      batches: response.batches.map(batch => resonseFormatter(batch))
    }
  })
}

export function getBelongedVouchers (batchCode, page, size) {
  return fetchJSON(`/api/v1/batches/${batchCode}/vouchers`, {
    query: formatRequest({
      page,
      size
    })
  })
}

export function getVouchersCount (batchCode) {
  return fetchJSON(`/api/v1/batches/${batchCode}/vouchers/count`)
}
