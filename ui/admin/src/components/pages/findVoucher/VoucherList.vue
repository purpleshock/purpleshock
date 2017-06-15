<template>
  <ul>
    <li v-for="(code, index) in codes" :key="index">
      <router-link class="voucher-code" :to="'/voucher/' + code">{{code}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    codes: Array
  }
}
</script>

<style scoped>
.voucher-code {
  text-transform: uppercase;
}
</style>
