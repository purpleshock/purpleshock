<template>
  <div class="login-form">
    <form novalidate @submit.stop.prevent="$emit('login', { mail, password })">
      <label>Mail</label>
      <input type="mail" v-model="mail"></input>
      <label>Password</label>
      <input type="password" v-model="password"></input>
      <button type="submit" :disabled="invalidForm">login</button>
    </form>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
.login-form {
  padding: 10px 30px 20px 30px;
  text-align: center;
}
</style>
