import { admins, localStorage } from '../../services'

export const LOGIN = 'user/login'
export const ON_GET_INFO = 'user/onGetInfo'

export default {
  state: {
    isLogin: false,
    mail: '',
    password: '',
    token: ''
  },
  mutations: {
    [LOGIN] (state, payload) {
      state.isLogin = false
    },
    [ON_GET_INFO] (state, payload) {
      state.isLogin = true
    }
  },
  actions: {
    async [LOGIN] ({ commit }, payload) {
      localStorage.setJWT(null)
      const { token } = await admins.login(payload.mail, payload.password)
      localStorage.setJWT(token)
    }
  }
}
