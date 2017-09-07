import { observable, action, runInAction, map, computed } from 'mobx'
import * as auth from '../services/auth'

class UserStore {
  @observable user = map({
    mail: '',
    password: ''
  })

  @observable isLoading = false

  @observable isAuthenticated = false

  @computed get isValid () {
    const mail = this.user.get('mail')
    const password = this.user.get('password')
    const regMail = /\S+@\S+\.\S+/

    const isMailValid = regMail.test(mail)
    const isPasswordValid = 5 <= password.length && password.length <= 30

    return isMailValid && isPasswordValid
  }

  @action change (field, value) {
    this.user.set(field, value)
  }

  @action async login () {
    runInAction(() => {
      this.isLoading = true
    })

    let token
    try {
      token = await auth.login(this.user.mail, this.user.password)
    } finally {
      runInAction(() => {
        this.isLoading = false
        this.isAuthenticated = !!token
      })
    }
  }

  @action async checkLoginStatus () {
    runInAction(() => this.isLoading = true)

    const isLogin = await auth.isLogin()
    runInAction(() => {
      this.isLoading = false
      this.isAuthenticated = isLogin
    })
  }
}

export default new UserStore()

