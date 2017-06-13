import moment from 'moment'

export default function formatResponse (response, ...momentFields) {
  const moments = {}
  for (let momentField of momentFields) {
    if (response.hasOwnProperty(momentField)) {
      const value = response[momentField]
      if (typeof value === 'number') {
        moments[momentField] = moment.unix(value)
      }
    }
  }

  return {
    ...response,
    ...moments
  }
}

export function getResponseFormatter (...momentFields) {
  return response => formatResponse(response, ...momentFields)
}
