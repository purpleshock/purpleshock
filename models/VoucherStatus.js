const StateMachine = require('javascript-state-machine')

const availableStatus = [
  // 初始化
  'INITIALIZED',
  // 已生效
  'ACTIVATED',
  // 已失效
  'DEACTIVATED',
  // 已到貨
  'CONSIGNED',
  // 已售出
  'SOLD',
  // 已註冊
  'APPLIED'
]

function VoucherStatus (status) {
  if (typeof VoucherStatus[status] === 'string') {
    this._fsm()
    this.resetTo(status)
  } else {
    throw new Error('Invalid voucher status: ' + status)
  }
}

availableStatus.forEach(status => {
  VoucherStatus[status] = status
})

VoucherStatus.getAvailableStatus = () => availableStatus.slice()
VoucherStatus.canMakeTransition = (fromStatus, toStatus) => {
  const machine = new VoucherStatus(fromStatus)
  switch (toStatus) {
    case VoucherStatus.DEACTIVATED:
      return machine.can('deactivate')
    case VoucherStatus.ACTIVATED:
      return machine.can('activate')
    case VoucherStatus.CONSIGNED:
      return machine.can('consign')
    case VoucherStatus.SOLD:
      return machine.can('sell')
    case VoucherStatus.APPLIED:
      return machine.can('apply')
    default:
      return false
  }
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
