<template>
  <md-card class="login-form">
    <form novalidate @submit.stop.prevent="submit">
      <md-input-container>
        <label>Mail</label>
        <md-input type="mail"></md-input>
      </md-input-container>
      <md-input-container md-has-password>
        <label>Password</label>
        <md-input type="password"></md-input>
      </md-input-container>
      <md-button class="md-primary" type="submit">login</md-button>
    </form>
  </md-card>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
