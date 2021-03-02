import { Storage } from '@/utils'
import { TOKEN_KEY } from '@/utils/storageKeys'

const Auth = {
  getToken: () => Storage.get(TOKEN_KEY),
  setToken: (val) => Storage.set(TOKEN_KEY, val),
  removeToken: () => Storage.remove(TOKEN_KEY)
}

export default Auth
