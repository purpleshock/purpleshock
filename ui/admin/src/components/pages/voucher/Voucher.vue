<template>
  <div>
    <h1>Voucher</h1>
    <voucher-info v-if="showVoucher" :voucher="voucher"></voucher-info>
  </div>
</template>

<script>
import moment from 'moment'
import VoucherInfo from './VoucherInfo'

export default {
  components: {
    VoucherInfo
  },
  data () {
    return {
      voucher: {
        code: 'xxxx-xxxx-xxxx-xxxx',
        status: 'Initialized',
        createdAt: moment(),
        expiredAt: moment()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.queryVoucher(to.query))
  },
  beforeRouteUpdate (to, from, next) {
    this.queryVoucher(to.query).then(next)
  },
  computed: {
    showVoucher () {
      return !!this.$route.params.voucherCode
    }
  },
  methods: {
    onFind (code) {
      this.$router.push({
        path: `/voucher/${code}`
      })
    },
    queryVoucher (query) {
    }
  }
}
</script>
