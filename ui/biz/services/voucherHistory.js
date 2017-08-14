import axios from 'axios'
import { stringify } from './querystring'

export function queryHistory (createDateFrom, createDateTo, page, size) {
  const query = stringify({
    createDateFrom,
    createDateTo,
    page,
    size
  })
  return axios.get(`${process.env.AP}/api/v1/batches?${query}`)
  .then(response => response.data)
}
