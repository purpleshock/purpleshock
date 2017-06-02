import { admins } from '../../services'

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
      state.isLogin = true
    },
    [ON_LOGIN] (state, payload) {
      state.isLogin = false
      state.mail = payload.mail
      state.password = payload.password
      state.token = payload.token
    }
  },
  actions: {
    async [LOGIN] ({ commit }, payload) {
      const { token } = await admins.login(payload.mail, payload.password)
      commit(ON_LOGIN, {
        ...payload,
        token
      })
    }
  }
}
