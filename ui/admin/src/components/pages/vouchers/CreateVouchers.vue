<template>
  <form novalidate @submit.stop.prevent="onSubmit">
    <md-input-container>
      <label>Number of vouchers</label>
      <md-input type="number" v-model="num"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Voucher amount</label>
      <md-input type="number" v-model="amount"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Description</label>
      <md-textarea v-model="description"></md-textarea>
    </md-input-container>
    <div>
      <date-range-picker @change="onChangeValidPeriod"></date-range-picker>
    </div>
    <md-snackbar ref="snackbar">
      <span>Creation Success</span>
      <md-button class="md-icon-button md-dense" @click.native="$refs.snackbar.close()">
        <md-icon>clear</md-icon>
      </md-button>
    </md-snackbar>
    <md-button type="submit" class="md-primary">create</md-button>
  </form>
</template>

<script>
import { CREATE_VOUCHERS } from '@/store/modules/vouchers'
import DateRangePicker from '@/components/forms/DateRangePicker'

export default {
  components: {
    DateRangePicker
  },
  data () {
    return {
      num: '',
      amount: '',
      description: '',
      validAt: '',
      expiredAt: ''
    }
  },
  methods: {
    onChangeValidPeriod (start, end) {
      this.validAt = start
      this.expiredAt = end
    },
    onSubmit () {
      this.$store.dispatch(CREATE_VOUCHERS, this.$data)
      .then(() => {
        this.$refs.snackbar.open()
      })
    }
  }
}
</script>
