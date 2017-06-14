<template>
  <md-list>
    <md-list-item v-for="(code, index) in codes" :key="index">
      <md-card class="voucher-list">
        <router-link :to="'/voucher/' + code">
          <md-card-content class="voucher-code">{{code}}</md-card-content>
        </router-link>
      </md-card>
    </md-list-item>
  </md-list>
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
