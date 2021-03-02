import { Storage } from '@/utils'
import { PASSWORD_KEY } from './storageKeys'

export function setPassword(userName, password) {
  if (userName) {
    const data = Storage.get(PASSWORD_KEY) || {}
    data[userName] = password
    Storage.set(PASSWORD_KEY, data)
  }
}

export function getPassword(userName) {
  const data = Storage.get(PASSWORD_KEY) || {}
  return userName ? data[userName] : data
}
