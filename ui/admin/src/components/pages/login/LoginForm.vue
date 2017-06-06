<template>
  <md-card class="login-form">
    <form novalidate @submit.stop.prevent="onSubmit">
      <md-input-container>
        <label>Mail</label>
        <md-input type="mail" v-model="mail"></md-input>
      </md-input-container>
      <md-input-container md-has-password>
        <label>Password</label>
        <md-input type="password" v-model="password"></md-input>
      </md-input-container>
      <md-button class="md-primary" type="submit" :disabled="invalidForm">login</md-button>
    </form>
  </md-card>
</template>

<script>
import { LOGIN } from '@/store/modules/user'

export default {
  data () {
    return {
      mail: '',
      password: ''
    }
  },
  computed: {
    invalidForm () {
      return !this.mail || !this.password
    }
  },
  methods: {
    onSubmit () {
      const { mail, password } = this
      this.$store.dispatch(LOGIN, {
        mail,
        password
      })
      .then(() => {
        this.$router.push({
          path: '/dashboard'
        })
      })
    }
  }
}
</script>

<style scoped>
.login-form {
  padding: 10px 30px 20px 30px;
  text-align: center;
  width: 300px;
}
</style>
