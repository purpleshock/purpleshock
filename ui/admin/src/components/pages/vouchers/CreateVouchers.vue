<template>
  <form novalidate @submit.stop.prevent="onSubmit">
    <md-input-container>
      <label>Number of vouchers</label>
      <md-input type="number" v-model="numOfVouchers"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Description</label>
      <md-textarea v-model="description"></md-textarea>
    </md-input-container>
    <div>
      <date-range-picker @change="onChangeValidPeriod"></date-range-picker>
    </div>
    <md-snackbar>
      <span>Connection timeout. Showing limited messages.</span>
      <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">Retry</md-button>
      <md-button class="md-icon-button md-dense" @click.native="onClear('endTime')">
        <md-icon>clear</md-icon>
      </md-button>
    </md-snackbar>
  </form>
</template>

<script>
import { CREATE_BATCH } from '@/store/modules/vouchers'
import DateRangePicker from '@/components/forms/DateRangePicker'

export default {
  components: {
    DateRangePicker
  },
  data () {
    return {
      numOfVouchers: '',
      description: '',
      startTime: '',
      endTime: ''
    }
  },
  methods: {
    onChangeValidPeriod (start, end) {
      this.startTime = start
      this.endTime = end
    },
    onSubmit () {
      this.$store.dispatch(CREATE_BATCH)
    }
  }
}
</script>
