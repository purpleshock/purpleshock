import axios from 'axios'
import { stringify } from './querystring'

export function createVouchers (formData) {
  const data = {
    num: formData.numVouchers,
    amount: formData.amount
  }
  return axios.post(`${process.env.AP}/api/v1/batches`, data)
  .then(response => response.data)
}

export function findVouchersByTerm (term, size = 5) {
  const query = stringify({
    term,
    size
  })
  return axios.get(`${process.env.AP}/api/v1/vouchers?${query}`)
  .then(response => response.data)
}

export function getAvailableStatus () {
  return axios.get(`${process.env.AP}/api/v1/vouchers/status`)
  .then(response => response.data)
}

export function queryVoucher (code) {
  return axios.get(`${process.env.AP}/api/v1/vouchers/${code}`)
  .then(response => response.data)
}
