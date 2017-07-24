import axios from 'axios'
import { stringify } from './querystring'

export function queryHistoryCount (validAt, expiredAt) {
  const query = stringify({
    validAt,
    expiredAt
  })
  return axios.get(`${process.env.AP}/api/v1/batches/count?${query}`)
  .then(response => response.data)
}

export function queryHistory (validAt, expiredAt, page, size) {
  const query = stringify({
    validAt,
    expiredAt,
    page,
    size
  })
  return axios.get(`${process.env.AP}/api/v1/batches?${query}`)
  .then(response => response.data.batches)
}
