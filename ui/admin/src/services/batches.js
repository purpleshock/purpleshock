import moment from 'moment'
import { fetchJSON } from './fetch'
import formatRequest from '../utils/formatRequest'

export function createBatch (formData) {
  return fetchJSON('/api/v1/batches', {
    method: 'POST',
    body: formatRequest(formData)
  })
  .then(response => {
    const { createdAt, validAt, expiredAt } = response
    return {
      ...response,
      createdAt: createdAt && moment.unix(createdAt),
      validAt: validAt && moment.unix(validAt),
      expiredAt: expiredAt && moment.unix(expiredAt)
    }
  })
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
      batches: response.batches.map(batch => {
        const { createdAt, validAt, expiredAt } = batch
        return {
          ...batch,
          createdAt: createdAt && moment.unix(createdAt),
          validAt: validAt && moment.unix(validAt),
          expiredAt: expiredAt && moment.unix(expiredAt)
        }
      })
    }
  })
}
