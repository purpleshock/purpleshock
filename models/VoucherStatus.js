const StateMachine = require('javascript-state-machine')

function VoucherStatus (status) {
  if (status >= VoucherStatus.INITIALIZED && status <= VoucherStatus.APPLIED) {
    this._fsm()
    this.goto(status)
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
      name: 'goto',
      from: '*',
      to (nextStatus) {
        if (this.cannot(status)) {
          throw new Error(`It's illegal to switch voucher state from ${this.state} to ${status}.`)
        }
        return status
      }
    }
  ]
})

module.exports = VoucherStatus
