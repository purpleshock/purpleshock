<template>
  <div class="side-menu">
    <md-list>
      <md-list-item>
        <router-link to="/dashboard">
          <md-icon>dashboard</md-icon>
          <span class="link-label">dashboard</span>
        </router-link>
      </md-list-item>
      <md-list-item>
        <router-link to="/batches">
          <md-icon>all_inclusive</md-icon>
          <span class="link-label">batches</span>
        </router-link>
      </md-list-item>
    </md-list>
  </div>
</template>

<style scoped>
.link-label {
  text-transform: uppercase;
}
</style>
