<template>
  <login-form @login="onLogin"></login-form>
</template>

<script>
import LoginForm from './LoginForm'
import { LOGIN } from '@/store/modules/user'

export default {
  components: {
    LoginForm
  },
  methods: {
    onLogin (formData) {
      this.$store.dispatch(LOGIN, formData)
      .then(() => {
        this.$router.push({
          path: '/dashboard'
        })
      })
    }
  }
}
</script>
