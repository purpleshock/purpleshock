<template>
  <centered-layout>
    <login-form></login-form>
  </centered-layout>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>
