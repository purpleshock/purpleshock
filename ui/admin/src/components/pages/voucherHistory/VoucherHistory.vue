<template>
  <div class="voucher-history">
    <date-range-form @find="onFindDateRange"></date-range-form>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DateRangeForm from '@/components/forms/DateRangeForm'
import { FIND_BATCHES } from '@/store/modules/batches'
import formatRequest from '@/utils/formatRequest'

export default {
  components: {
    DateRangeForm
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query.page) {
        vm.findBatches(to.query)
      }
    })
  },
  methods: {
    ...mapActions({
      findBatches: FIND_BATCHES
    }),
    onFindDateRange (formData) {
      const query = {
        ...formatRequest(formData),
        page: 1
      }
      this.$router.push({ query })
      this.findBatches(query)
    }
  }
}
</script>
