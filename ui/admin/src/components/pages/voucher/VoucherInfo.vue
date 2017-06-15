<template>
  <div class="voucher-info">
    <form novalidate @submit.stop.prevent>
      <h2 class="voucher-code">{{voucher.code}}</h2>
      <label class="item-title" for="voucher-status">
        <span>status</span>
        <select name="country" id="voucher-status" v-model="editStatus">
          <option v-for="status in allStatus" :value="status" :key="status">{{status}}</option>
        </select>
      </label>
      <label class="item-title">
        <span>amount</span>
        <input v-model="editAmount"></input>
      </label>
      <ul>
        <li>
          <span class="item-title">batch</span>
          <span class="bactch-code">{{batch.code}}</span>
        </li>
        <li v-if="batch.createdAt">
          <span class="item-title">creation time</span>
          <span>{{batch.createdAt.format('YYYY-MM-DD')}}</span>
        </li>
        <li v-if="batch.validAt">
          <span class="item-title">valid time</span>
          <span>{{batch.validAt.format('YYYY-MM-DD')}}</span>
        </li>
        <li v-if="batch.expiredAt">
          <span class="item-title">expired time</span>
          <span>{{batch.expiredAt.format('YYYY-MM-DD')}}</span>
        </li>
      </ul>
      <div>
        <button type="reset" :disabled="isClean" @click="onReset">reset</button>
        <button type="submit" :disabled="isClean">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import VoucherInfo from './VoucherInfo'
import * as allStatus from '@/consts/voucherStatus'

export default {
  components: {
    VoucherInfo
  },
  props: {
    voucher: Object,
    batch: Object
  },
  data () {
    return {
      allStatus: Object.values(allStatus),
      editStatus: '',
      editAmount: ''
    }
  },
  computed: {
    isClean () {
      return (
        this.voucher.status === this.editStatus &&
        this.voucher.amount === this.editAmount
      )
    },
    showVoucher () {
      return !!this.$route.params.voucherCode
    }
  },
  created () {
    this.editStatus = this.voucher.status
    this.editAmount = this.voucher.amount
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.queryVouchers(to.query))
  },
  beforeRouteUpdate (to, from, next) {
    this.queryVouchers(to.query).then(next)
  },
  methods: {
    onFind (code) {
      this.$router.push({
        path: `/voucher/${code}`
      })
    },
    queryVoucher (query) {
    },
    onReset () {
      this.editStatus = this.voucher.status
      this.editAmount = this.voucher.amount
    }
  }
}
</script>

<style scoped>
.voucher-code, .bactch-code {
  text-transform: uppercase;
}

.item-title::first-letter {
  text-transform: uppercase;
}
</style>
