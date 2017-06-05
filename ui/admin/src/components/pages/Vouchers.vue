<template>
  <div>
    <h1>Vouchers</h1>
    <create-batch @submit="onCreateBatch"></create-batch>
  </div>
</template>

<script scoped>
import { CREATE_BATCH } from '@/store/modules/vouchers'
import { CreateBatch } from '@/components/forms'

export default {
  components: {
    CreateBatch
  },
  methods: {
    onCreateBatch (formData) {
      this.$store.dispatch(CREATE_BATCH, formData)
    }
  }
}
</script>
