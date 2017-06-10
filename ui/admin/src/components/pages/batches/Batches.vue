<template>
  <div>
    <h1>Batches</h1>
    <create-batch @create="onCreate"></create-batch>
    <find-batches :batches="batches" :total-pages="totalPages" @find="onFind"></find-batches>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CREATE_BATCH, FIND_BATCHES } from '@/store/modules/batches'
import formatRequest from '@/utils/formatRequest'
import CreateBatch from './CreateBatch'
import FindBatches from './FindBatches'

export default {
  components: {
    CreateBatch,
    FindBatches
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.findBatches(to.query))
  },
  beforeRouteUpdate (to, from, next) {
    this.findBatches(to.query).then(next)
  },
  computed: {
    ...mapState({
      size: state => state.batches.pageOffset,
      batches: state => state.batches.list,
      totalPages: state => state.batches.totalPages
    })
  },
  methods: {
    onCreate (formData) {
      this.$store.dispatch(CREATE_BATCH, formData)
    },
    onFind (formData) {
      this.$router.push({
        path: '/batches',
        query: formatRequest({
          ...formData,
          page: 1
        })
      })
    },
    findBatches (query) {
      if (query.page) {
        return this.$store.dispatch(FIND_BATCHES, query)
      }
    }
  }
}
</script>
