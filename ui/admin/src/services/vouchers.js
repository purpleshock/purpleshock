import { fetchJSON, formatBody } from './fetch'

export function createVouchers (formData) {
  return fetchJSON('/api/v1/vouchers', {
    method: 'POST',
    body: formatBody(formData)
  })
}
