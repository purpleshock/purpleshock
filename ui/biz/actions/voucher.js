import * as voucherApi from '../services/voucher'
import * as voucherStatus from './voucherStatus'

export const GET_VOUCHER = 'ps-biz/voucher/GET_VOUCHER'
export const ON_GET_VOUCHER = 'ps-biz/voucher/ON_GET_VOUCHER'

export function getVoucher () {
  return {
    type: GET_VOUCHER
  }
}

export function onGetVoucher (code, voucher) {
  return {
    type: ON_GET_VOUCHER,
    payload: {
      code,
      voucher
    }
  }
}

export function searchVoucher (code) {
  return async (dispatch, getState) => {
    dispatch(getVoucher())

    const state = getState()
    if (!state.voucherAvailableStatus) {
      const status = await voucherApi.getAvailableStatus()
      dispatch(voucherStatus.onGetAvailableStatus(status))
    }

    const voucher = await voucherApi.queryVoucher(code)
    const voucherAvailableStatus = await voucherApi.queryVoucherAvailableStatus(code)
    dispatch(onGetVoucher(code, {
      ...voucher,
      statusOptions: voucherAvailableStatus
    }))
  }
}

export function modifyVoucher(code, formData) {
  return async dispatch => {
    await voucherApi.updateVoucher(code, formData)
  }
}