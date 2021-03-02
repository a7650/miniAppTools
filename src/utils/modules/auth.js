import { Storage } from './storage'

const TOKEN_KEY = 'token'

const Auth = {
  getToken: () => Storage.get(TOKEN_KEY),
  setToken: (val) => Storage.set(TOKEN_KEY, val),
  removeToken: () => Storage.remove(TOKEN_KEY)
}

export default Auth
