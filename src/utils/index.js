export { default as ImageHelpers } from './modules/imgHelpers'
export { default as Money } from './modules/money'
export { default as Storage } from './modules/storage'
export { default as Time } from './modules/time'
export { default as Toast } from './modules/toast'
export { default as Url } from './modules/url'
export { default as Verify } from './modules/verify'
export { default as Auth } from './modules/auth'

export function isPlainObject(val) {
  return _toString.call(val) === typeClass['object']
}
