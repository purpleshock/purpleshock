<template>
  <login-form @submit="onLogin"></login-form>
</template>

<script>
import { LOGIN } from '@/store/modules/user'
import { LoginForm } from '@/components/forms'

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
