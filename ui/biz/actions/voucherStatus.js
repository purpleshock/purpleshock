import * as voucherApi from '../services/voucher'

export const ON_GET_AVAILABLE_STATUS = 'ps-biz/voucherStatus/ON_GET_AVAILABLE_STATUS'

export function onGetAvailableStatus (status) {
  return {
    type: ON_GET_AVAILABLE_STATUS,
    payload: status
  }
}
