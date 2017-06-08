<template>
  <div>
    <h1>Vouchers</h1>
    <create-vouchers @create="onCreate"></create-vouchers>
    <find-vouchers @find="onFind"></find-vouchers>
  </div>
</template>

<script>
import { CREATE_VOUCHERS, FIND_VOUCHERS } from '@/store/modules/vouchers'
import formatRequest from '@/utils/formatRequest'
import CreateVouchers from './CreateVouchers'
import FindVouchers from './FindVouchers'

export default {
  components: {
    CreateVouchers,
    FindVouchers
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.findVouchers(to.query))
  },
  beforeRouteUpdate (to, from, next) {
    this.findVouchers(to.query).then(next)
  },
  methods: {
    onCreate (formData) {
      this.$store.dispatch(CREATE_VOUCHERS, formData)
    },
    onFind (formData) {
      console.log(formData)
      this.$router.push({
        path: '/vouchers',
        query: formatRequest({
          ...formData,
          page: 1
        })
      })
    },
    async findVouchers (query) {
      if (query.page) {
        await this.$store.dispatch(FIND_VOUCHERS, query)
      }
    }
  }
}
</script>
