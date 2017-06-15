<template>
  <div class="voucher-history">
    <date-range-form @find="onFindDateRange"></date-range-form>
    <batch-list :batches="batches" @load-voucher="findBelongedVouchers"></batch-list>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BatchList from './BatchList'
import DateRangeForm from '@/components/forms/DateRangeForm'
import { FIND_BATCHES, FIND_BELONGED_VOUCHERS } from '@/store/modules/batches'
import formatRequest from '@/utils/formatRequest'

export default {
  components: {
    DateRangeForm,
    BatchList
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query.page) {
        vm.findBatches(to.query)
      }
    })
  },
  computed: {
    ...mapState({
      batches: state => state.batches.list.map(code => {
        return state.batches.instances[code]
      })
    })
  },
  methods: {
    ...mapActions({
      findBatches: FIND_BATCHES,
      findBelongedVouchers: FIND_BELONGED_VOUCHERS
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
