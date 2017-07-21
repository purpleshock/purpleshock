const StateMachine = require('javascript-state-machine')

function VoucherStatus (status) {
  if (typeof VoucherStatus[status.toUpperCase()] === 'string') {
    this._fsm()
    this.resetTo(status)
  } else {
    throw new Error('Invalid voucher status: ' + status)
  }
}

VoucherStatus.INITIALIZED = 'Initialized'
VoucherStatus.ACTIVATED = 'Activated'
VoucherStatus.DEACTIVATED = 'Deactivated'
VoucherStatus.CONSIGNED = 'Consigned'
VoucherStatus.SOLD = 'Sold'
VoucherStatus.APPLIED = 'Applied'

VoucherStatus.getStatusValue = function (value) {
  return {
    [VoucherStatus.INITIALIZED]: 0,
    [VoucherStatus.ACTIVATED]: 1,
    [VoucherStatus.DEACTIVATED]: 2,
    [VoucherStatus.CONSIGNED]: 3,
    [VoucherStatus.SOLD]: 4,
    [VoucherStatus.APPLIED]: 5
  }[value]
}

StateMachine.factory(VoucherStatus, {
  transitions: [
    {
      name: 'deactivate',
      from: '*',
      to: VoucherStatus.DEACTIVATED
    },
    {
      name: 'activate',
      from: VoucherStatus.INITIALIZED,
      to: VoucherStatus.ACTIVATED
    },
    {
      name: 'consign',
      from: VoucherStatus.ACTIVATED,
      to: VoucherStatus.CONSIGNED
    },
    {
      name: 'sell',
      from: VoucherStatus.CONSIGNED,
      to: VoucherStatus.SOLD
    },
    {
      name: 'apply',
      from: VoucherStatus.SOLD,
      to: VoucherStatus.APPLIED
    },
    {
      name: 'resetTo',
      from: '*',
      to (nextStatus) {
        return nextStatus
      }
    }
  ]
})

module.exports = VoucherStatus
