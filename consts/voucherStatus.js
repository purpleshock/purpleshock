const status = [
  'INITIALIZED',
  'ACTIVATED',
  'DEACTIVATED',
  'CONSIGNED',
  'SOLD',
  'APPLIED'
]

module.exports = status.reduce((mod, val, index) => Object.defineProperty(mod, val, {
  enumerable: true,
  configurable: false,
  writable: false,
  value: index
}), {})
