<template>
  <div class="menu-layout">
    <side-menu @create-batch="$refs.createBatch.open()"></side-menu>
    <div class="content">
      <router-view></router-view>
    </div>
    <create-batch ref="createBatch" @create="onCreateBatch"></create-batch>
  </div>
</template>

<script>
import SideMenu from '../menu/SideMenu'
import CreateBatch from '../menu/CreateBatch'
import { CREATE_BATCH } from '@/store/modules/batches'
import formatRequest from '@/utils/formatRequest'

export default {
  components: {
    SideMenu,
    CreateBatch
  },
  methods: {
    async onCreateBatch (formData) {
      formData = formatRequest(formData)
      await this.$store.dispatch(CREATE_BATCH, formData)
      this.$refs.createBatch.close()
    }
  }
}
</script>

<style scoped>
.menu-layout {
  display: flex;
}
</style>
