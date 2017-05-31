const test = require('ava')
const { spy } = require('sinon')
const { permission } = require('../../services')

const req = {
  user: {
    scopes: {
      voucher: ['create', 'remove']
    }
  }
}
const res = {}
const next = spy()

test.beforeEach(() => {
  next.reset()
})

test('#getCheckScopesMiddleware', t => {
  permission.getCheckScopesMiddleware(['voucher.create', 'voucher.remove'])(req, res, next)
  t.true(next.calledOnce)
  t.is(next.args[0].length, 0)
})

test('#getCheckScopesMiddleware with partial unauthorized sub-permission', t => {
  permission.getCheckScopesMiddleware(['voucher.create', 'voucher.print'])(req, res, next)
  t.true(next.calledOnce)
  t.is(next.args[0][0].status, 401)
})

test('#getCheckScopesMiddleware with partial unauthorized permission', t => {
  permission.getCheckScopesMiddleware(['voucher.create', 'account.create'])(req, res, next)
  t.true(next.calledOnce)
  t.is(next.args[0][0].status, 401)
})

test('#getCheckScopesMiddleware with unauthorized permission', t => {
  permission.getCheckScopesMiddleware(['account.create'])(req, res, next)
  t.true(next.calledOnce)
  t.is(next.args[0][0].status, 401)
})
