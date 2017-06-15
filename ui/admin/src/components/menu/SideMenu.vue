<template>
  <div class="side-menu">
    <ul>
      <li>
        <button type="button" @click="$modal.show('create-batch')">create</button>
      </li>
      <li>
        <router-link to="/dashboard">
          <span class="link-label">dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/find-voucher">
          <span class="link-label">vouchers</span>
        </router-link>
      </li>
      <li>
        <router-link to="/voucher-history">
          <span class="link-label">history</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.link-label {
  text-transform: uppercase;
}

.btn-create {
  font-size: 16px;
  margin: 0;
}
</style>
