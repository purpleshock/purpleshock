<template>
  <md-card class="voucher-info">
    <form novalidate @submit.stop.prevent>
      <md-card-header>
        <h2 class="md-title voucher-code">{{voucher.code}}</h2>
        <md-input-container>
          <label class="item-title" for="voucher-status">status</label>
          <md-select name="country" id="voucher-status" v-model="editStatus">
            <md-option v-for="status in allStatus" :value="status" :key="status">{{status}}</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label class="item-title">amount</label>
          <md-input v-model="editAmount"></md-input>
        </md-input-container>
      </md-card-header>
      <md-card-content>
        <md-list>
          <md-list-item>
            <div class="md-list-text-container">
              <span class="item-title">batch</span>
              <span class="bactch-code">{{batch.code}}</span>
            </div>
          </md-list-item>
          <md-list-item v-if="batch.createdAt">
            <div class="md-list-text-container">
              <span class="item-title">creation time</span>
              <span>{{batch.createdAt.format('YYYY-MM-DD')}}</span>
            </div>
          </md-list-item>
          <md-list-item v-if="batch.validAt">
            <div class="md-list-text-container">
              <span class="item-title">valid time</span>
              <span>{{batch.validAt.format('YYYY-MM-DD')}}</span>
            </div>
          </md-list-item>
          <md-list-item v-if="batch.expiredAt">
            <div class="md-list-text-container">
              <span class="item-title">expired time</span>
              <span>{{batch.expiredAt.format('YYYY-MM-DD')}}</span>
            </div>
          </md-list-item>
        </md-list>
      </md-card-content>
      <md-card-actions>
        <md-button :disabled="isClean" @click.native="reset">reset</md-button>
        <md-button type="submit" class="md-primary" :disabled="isClean">submit</md-button>
      </md-card-actions>
    </form>
  </md-card>
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
    reset () {
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
