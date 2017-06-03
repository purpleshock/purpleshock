<template>
  <div class="menu-layout">
    <side-menu></side-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from '../menu/SideMenu'

export default {
  components: {
    SideMenu
  }
}
</script>

<style scoped>
.menu-layout {
  display: flex;
}
</style>
