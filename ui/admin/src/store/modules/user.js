import { admins, localStorage } from '../../services'

export const LOGIN = 'user/login'
export const ON_LOGIN = 'user/onLogin'

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
    [ON_LOGIN] (state, payload) {
      state.isLogin = true
      state.mail = payload.mail
      state.password = payload.password
      state.token = payload.token
    }
  },
  actions: {
    async [LOGIN] ({ commit }, payload) {
      localStorage.setJWT(null)
      const { token } = await admins.login(payload.mail, payload.password)
      localStorage.setJWT(token)
      commit(ON_LOGIN, {
        ...payload,
        token
      })
    }
  }
}
