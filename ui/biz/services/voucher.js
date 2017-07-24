import axios from 'axios'

export function createVouchers (formData) {
  const data = {
    num: formData.numVouchers,
    amount: formData.amount
  }
  return axios.post(`${process.env.AP}/api/v1/batches`, data)
  .then(response => response.data)
}
