<template>
  <div class="side-menu">
    <md-list>
      <md-list-item>
        <md-button
          class="md-raised md-primary btn-create"
          @click.native="$emit('create-batch')">create</md-button>
      </md-list-item>
      <md-list-item>
        <router-link to="/dashboard">
          <span class="link-label">dashboard</span>
        </router-link>
      </md-list-item>
      <md-list-item>
        <router-link to="/batch-history">
          <span class="link-label">history</span>
        </router-link>
      </md-list-item>
    </md-list>
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
