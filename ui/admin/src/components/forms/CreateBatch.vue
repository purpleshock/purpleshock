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
    <md-button type="submit" class="md-primary">create</md-button>
  </form>
</template>

<script>
import DateRangePicker from './DateRangePicker'

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
      this.$emit('submit', this.$data)
    }
  }
}
</script>
