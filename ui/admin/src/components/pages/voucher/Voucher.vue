<template>
  <div>
    <h1>Voucher</h1>
    <voucher-info v-if="showVoucher" :voucher="voucher" :batch="batch"></voucher-info>
  </div>
</template>

<script>
import VoucherInfo from './VoucherInfo'
import { FIND_VOUCHER } from '@/store/modules/vouchers'

export default {
  components: {
    VoucherInfo
  },
  data () {
    return {
      voucher: null,
      batch: null
    }
  },
  computed: {
    showVoucher () {
      return this.voucher && this.batch
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.queryVoucher(to.params.voucherCode))
  },
  beforeRouteUpdate (to, from, next) {
    this.queryVoucher(to.params.voucherCode).then(next)
  },
  methods: {
    onFind (code) {
      this.$router.push({
        path: `/voucher/${code}`
      })
    },
    queryVoucher (code) {
      this.$store.dispatch(FIND_VOUCHER, { code })
      .then(() => {
        const { voucherCode } = this.$route.params
        this.voucher = this.$store.state.vouchers[voucherCode]
        this.batch = this.$store.state.batches.instances[this.voucher.batchCode]
      })
    }
  }
}
</script>
