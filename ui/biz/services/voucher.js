import axios from 'axios'
import { getToken } from './token'

export function createVouchers (formData) {
  const data = {
    num: formData.numVouchers,
    amount: formData.amount
  }
  return axios.post(`${process.env.AP}/api/v1/batches`, data, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
  .then(response => response.data)
}
