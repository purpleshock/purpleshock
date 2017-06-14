<template>
  <div>
    <batch-info v-if="batch" :batch="batch"></batch-info>
  </div>
</template>

<script>
import BatchInfo from './BatchInfo'
import { FIND_BATCH } from '@/store/modules/batches'

export default {
  components: {
    BatchInfo
  },
  data () {
    return {
      batch: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.queryBatch(to.params.batchCode))
  },
  beforeRouteUpdate (to, from, next) {
    this.queryBatch(to.params.batchCode).then(next)
  },
  methods: {
    queryBatch (code) {
      this.$store.dispatch(FIND_BATCH, { code })
      .then(() => {
        const { batchCode } = this.$route.params
        this.batch = this.$store.state.batches.instances[batchCode]
      })
    }
  }
}
</script>
