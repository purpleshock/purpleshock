<template>
  <centered-layout>
    <login-form @submit="onLogin"></login-form>
  </centered-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { LOGIN } from '../store/modules/user'
import { CenteredLayout } from '@/components/layouts'
import { LoginForm } from '@/components/forms'

export default {
  components: {
    CenteredLayout,
    LoginForm
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ...mapActions({
      onLogin: LOGIN
    })
  }
}
</script>

<style scoped>

</style>
