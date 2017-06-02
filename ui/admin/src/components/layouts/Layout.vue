<template>
  <transition name="fade" mode="out-in">
    <menu-layout v-if="isLogin">
      <router-view></router-view>
    </menu-layout>
    <centered-layout v-else>
      <router-view></router-view>
    </centered-layout>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import CenteredLayout from './CenteredLayout'
import MenuLayout from './MenuLayout'

export default {
  components: {
    CenteredLayout,
    MenuLayout
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
