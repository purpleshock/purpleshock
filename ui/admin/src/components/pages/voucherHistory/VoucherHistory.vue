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
import { FIND_HISTORY, FIND_BELONGED_VOUCHERS } from '@/store/modules/voucherHistory'
import formatRequest from '@/utils/formatRequest'

export default {
  components: {
    DateRangeForm,
    BatchList
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query.page) {
        vm.findHistory(to.query)
      }
    })
  },
  computed: {
    ...mapState({
      batches: state => state.voucherHistory.batches
    })
  },
  methods: {
    ...mapActions({
      findHistory: FIND_HISTORY,
      findBelongedVouchers: FIND_BELONGED_VOUCHERS
    }),
    onFindDateRange (formData) {
      const query = {
        ...formatRequest(formData),
        page: 1
      }
      this.$router.push({ query })
      this.findHistory(query)
    }
  }
}
</script>
